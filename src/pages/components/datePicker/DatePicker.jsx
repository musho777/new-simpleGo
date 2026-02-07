import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ArrowBottom from 'assets/datePicker/arrow-bottom.svg';
import ArrowLeft from 'assets/datePicker/arrow-left.svg';
import Calendar from 'assets/datePicker/calendar.svg';
import closeIcon from 'assets/datePicker/close.svg';
import VectorLeft from 'assets/datePicker/vector-left.svg';
import VectorRight from 'assets/datePicker/vector-right.svg';
import dayjs from 'dayjs';

import {
  ArrowButton,
  CalendarButton,
  DateContainer,
  DateFrom,
  DatePickerContainer,
  DatePickerWrapper,
  DateStyles,
  DateTo,
  DateWrapper,
  DayButton,
  DayGrid,
  DayLabels,
  Header,
  MonthNavigator,
  ScrollItem,
  ScrollMonthContainer,
  ScrollYearContainer,
  TabButton,
  YearNavigator,
} from './DatePicker.styles';

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DatePicker = ({ onDateChange, noDate }) => {
  const [isFromSelected, setIsFromSelected] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(null);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);
  const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState(null);
  const calendarRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (v, k) =>
        new Date(0, k).toLocaleString('default', { month: 'long' })
      ),
    []
  );

  const handleRemoveDateFrom = () => {
    setDateFrom('');
    setDateTo('');
    if (onDateChange) {
      onDateChange({
        from: null,
        to: null,
      });
    }
  };

  const handleRemoveDateTo = () => {
    setDateTo('');
    if (onDateChange) {
      onDateChange({
        from: fromDate,
        to: null,
      });
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handlePrevYear = () => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() - 1);
    setSelectedDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() + 1);
    setSelectedDate(newDate);
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    setIsMonthDropdownVisible(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setIsYearDropdownVisible(false);
  };

  const handleDaySelectFrom = useCallback(
    (day) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      setFromDate(newDate);
      setSelectedDate(newDate);
      setIsFromSelected(false);
    },
    [selectedDate]
  );

  const handleDaySelectTo = useCallback(
    (day) => {
      if (fromDate) {
        const newDate = new Date(selectedDate);
        newDate.setDate(day);

        const formattedFromDate = dayjs(fromDate).format('YYYY-MM-DD');
        const formattedToDate = dayjs(newDate).format('YYYY-MM-DD');

        if (onDateChange) {
          onDateChange({
            from: formattedFromDate,
            to: formattedToDate,
          });
        }

        setDateFrom(formattedFromDate);
        setDateTo(formattedToDate);
        setIsFromSelected(true);
        setIsCalendarVisible(false);
      }
    },
    [onDateChange, fromDate, selectedDate]
  );

  const renderDays = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const prevMonthDaysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      0
    ).getDate();

    const days = [];

    for (let i = adjustedFirstDayOfWeek; i > 0; i--) {
      const prevDay = prevMonthDaysInMonth - i + 1;

      const isDisabled =
        !isFromSelected &&
        fromDate &&
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, prevDay) < fromDate;

      days.push(
        <DayButton key={`prev-${i}`} $isPreviousMonth disabled={isDisabled}>
          {prevDay}
        </DayButton>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSaturday = (days.length + 1) % 7 === 6;
      const isSunday = (days.length + 1) % 7 === 0;

      const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);

      const isDisabled = !isFromSelected && fromDate && currentDay < fromDate;

      days.push(
        <DayButton
          key={day}
          $isSaturday={isSaturday}
          $isSunday={isSunday}
          disabled={isDisabled}
          onClick={
            isFromSelected ? () => handleDaySelectFrom(day) : () => handleDaySelectTo(day)
          }
        >
          {day}
        </DayButton>
      );
    }

    return days;
  };

  const memoizedDays = useMemo(renderDays, [
    selectedDate,
    fromDate,
    isFromSelected,
    handleDaySelectFrom,
    handleDaySelectTo,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        yearRef.current &&
        !yearRef.current.contains(event.target) &&
        monthRef.current &&
        !monthRef.current.contains(event.target)
      ) {
        setIsYearDropdownVisible(false);
        setIsMonthDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (noDate) {
      handleRemoveDateFrom();
      handleRemoveDateTo();
    }
  }, [noDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DatePickerWrapper ref={calendarRef}>
      <DateContainer>
        <CalendarButton onClick={() => setIsCalendarVisible(!isCalendarVisible)}>
          <img src={Calendar} alt="Open calendar" />
          <p>Archived date</p>
          <img src={ArrowBottom} alt="arrow bottom" />
        </CalendarButton>
        {dateFrom && (
          <DateWrapper>
            <DateFrom>
              <p>From:</p>
              <DateStyles>
                <span>{dateFrom}</span>
                <img src={closeIcon} alt="close" onClick={handleRemoveDateFrom} />
              </DateStyles>
            </DateFrom>
            {dateTo && (
              <DateTo>
                <p>To:</p>
                <DateStyles>
                  <span>{dateTo}</span>
                  <img src={closeIcon} alt="close" onClick={handleRemoveDateTo} />
                </DateStyles>
              </DateTo>
            )}
          </DateWrapper>
        )}
      </DateContainer>

      <DatePickerContainer style={{ display: isCalendarVisible ? 'block' : 'none' }}>
        {isCalendarVisible && (
          <>
            <Header>
              <TabButton
                $active={isFromSelected}
                onClick={() => {
                  setIsFromSelected(true);
                }}
              >
                From
              </TabButton>
              <TabButton
                $active={!isFromSelected}
                onClick={() => {
                  setIsFromSelected(false);
                }}
              >
                To
              </TabButton>
            </Header>

            <MonthNavigator>
              <ArrowButton onClick={handlePrevMonth} $visible>
                <img src={VectorLeft} alt="Previous month" />
              </ArrowButton>
              <span
                ref={monthRef}
                onClick={() => setIsMonthDropdownVisible(!isMonthDropdownVisible)}
              >
                {selectedDate.toLocaleString('default', { month: 'long' })}
              </span>
              <ArrowButton onClick={handleNextMonth} $visible>
                <img src={VectorRight} alt="Next month" />
              </ArrowButton>

              {isMonthDropdownVisible && (
                <ScrollMonthContainer $isVisible={isMonthDropdownVisible} ref={monthRef}>
                  {months.map((month, index) => (
                    <ScrollItem key={month} onClick={() => handleMonthSelect(index)}>
                      {month}
                    </ScrollItem>
                  ))}
                </ScrollMonthContainer>
              )}
            </MonthNavigator>

            <YearNavigator>
              <>
                <ArrowButton onClick={handlePrevYear} $visible={isFromSelected}>
                  <img src={ArrowLeft} alt="Previous year" />
                </ArrowButton>
                <span
                  ref={yearRef}
                  onClick={() => setIsYearDropdownVisible(!isYearDropdownVisible)}
                >
                  {selectedDate.getFullYear()}
                </span>
                <ArrowButton
                  onClick={handleNextYear}
                  $rotate={!isFromSelected}
                  $visible={!isFromSelected}
                >
                  <img src={ArrowLeft} alt="Next year" />
                </ArrowButton>
              </>

              {isYearDropdownVisible && (
                <ScrollYearContainer $isVisible={isYearDropdownVisible} ref={yearRef}>
                  {Array.from({ length: 20 }, (v, i) => (
                    <ScrollItem
                      key={i}
                      onClick={() => handleYearSelect(selectedDate.getFullYear() - 10 + i)}
                    >
                      {selectedDate.getFullYear() - 10 + i}
                    </ScrollItem>
                  ))}
                </ScrollYearContainer>
              )}
            </YearNavigator>

            <DayLabels>
              {daysOfWeek.map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </DayLabels>

            <DayGrid>{memoizedDays}</DayGrid>
          </>
        )}
      </DatePickerContainer>
    </DatePickerWrapper>
  );
};

export default DatePicker;
