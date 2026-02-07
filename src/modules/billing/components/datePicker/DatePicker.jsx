// DatePicker.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ArrowLeft from 'assets/datePicker/arrow-left.svg';
import CalendarActive from 'assets/datePicker/calendar-active.svg';
import Calendar from 'assets/datePicker/calendar.svg';
import VectorLeft from 'assets/datePicker/vector-left.svg';
import VectorRight from 'assets/datePicker/vector-right.svg';
import dayjs from 'dayjs';

import {
  ArrowButton,
  CalendarButton,
  CalendarIcon,
  DatePickerContainer,
  DatePickerWrapper,
  DayButton,
  DayGrid,
  DayLabels,
  Header,
  Label,
  LabelWrapper,
  MonthNavigator,
  ScrollItem,
  ScrollMonthContainer,
  ScrollYearContainer,
  TabButton,
  YearNavigator,
} from './DatePicker.styles';

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DatePicker = ({ onDateChange, label, defaultFrom = null, defaultTo = null }) => {
  const [isFromSelected, setIsFromSelected] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);
  const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const selectedYearRef = useRef(null);
  const calendarRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, k) =>
        new Date(0, k).toLocaleString('default', { month: 'long' })
      ),
    []
  );

  const handlePrevMonth = () =>
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

  const handlePrevYear = () =>
    setSelectedDate(new Date(selectedDate.setFullYear(selectedDate.getFullYear() - 1)));
  const handleNextYear = () =>
    setSelectedDate(new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1)));

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
      const formatted = dayjs(newDate).format('YYYY-MM-DD');
      setFromDate(formatted);
      setSelectedDate(newDate);
      setIsFromSelected(false);
      onDateChange?.({ from: formatted });
    },
    [selectedDate, onDateChange]
  );

  const handleDaySelectTo = useCallback(
    (day) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      const formatted = dayjs(newDate).format('YYYY-MM-DD');
      setDateTo(formatted);
      setIsFromSelected(true);
      setIsCalendarVisible(false);
      onDateChange?.({ to: formatted });
    },
    [selectedDate, onDateChange]
  );

  const renderDays = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const adjustedFirst = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const days = [];

    for (let i = adjustedFirst; i > 0; i--) {
      days.push(
        <DayButton key={`prev-${i}`} $isPreviousMonth disabled>
          {prevMonthDays - i + 1}
        </DayButton>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      currentDay.setHours(0, 0, 0, 0);

      let isDisabled = currentDay > today;

      if (isFromSelected && dateTo) {
        isDisabled = isDisabled || dayjs(currentDay).isAfter(dateTo, 'day');
      } else if (!isFromSelected && fromDate) {
        isDisabled = isDisabled || dayjs(currentDay).isBefore(fromDate, 'day');
      }

      const isSelected = fromDate && dayjs(fromDate).isSame(currentDay, 'day');
      const isToSelected = dateTo && dayjs(dateTo).isSame(currentDay, 'day');
      const dayOfWeek = currentDay.getDay();
      const isSaturday = dayOfWeek === 6;
      const isSunday = dayOfWeek === 0;

      days.push(
        <DayButton
          key={day}
          $disabled={isDisabled}
          $isSaturday={isSaturday}
          $isSunday={isSunday}
          $isSelected={isSelected || isToSelected}
          onClick={
            !isDisabled
              ? isFromSelected
                ? () => handleDaySelectFrom(day)
                : () => handleDaySelectTo(day)
              : undefined
          }
        >
          {day}
        </DayButton>
      );
    }

    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push(
          <DayButton key={`next-${i}`} $isPreviousMonth>
            {i}
          </DayButton>
        );
      }
    }

    return days;
  }, [selectedDate, fromDate, dateTo, isFromSelected, handleDaySelectFrom, handleDaySelectTo]);

  const memoizedDays = useMemo(() => renderDays(), [renderDays]);

  const toggleMonthDropdown = () => {
    setIsMonthDropdownVisible(!isMonthDropdownVisible);
    setIsYearDropdownVisible(false);
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownVisible(!isYearDropdownVisible);
    setIsMonthDropdownVisible(false);
  };

  useEffect(() => {
    if (defaultFrom) {
      const from = dayjs(defaultFrom).toDate();
      setSelectedDate(from);
      setFromDate(dayjs(from).format('YYYY-MM-DD'));
    } else {
      setFromDate(null);
    }
    if (defaultTo) {
      setDateTo(dayjs(defaultTo).format('YYYY-MM-DD'));
    } else {
      setDateTo(null);
    }

    if (!defaultFrom && !defaultTo) {
      setIsFromSelected(true);
      setIsCalendarVisible(false);
      setSelectedDate(new Date());
    }
  }, [defaultFrom, defaultTo]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarVisible(false);
      }
      if (
        yearRef.current &&
        !yearRef.current.contains(e.target) &&
        monthRef.current &&
        !monthRef.current.contains(e.target)
      ) {
        setIsMonthDropdownVisible(false);
        setIsYearDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isYearDropdownVisible && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }, [isYearDropdownVisible]);

  return (
    <DatePickerWrapper ref={calendarRef}>
      <CalendarButton
        $active={isCalendarVisible}
        onClick={() => setIsCalendarVisible(!isCalendarVisible)}
      >
        <CalendarIcon
          src={isCalendarVisible ? CalendarActive : Calendar}
          alt="Open calendar"
        />
        <LabelWrapper>
          <Label $active={isCalendarVisible}>
            {fromDate
              ? `${dayjs(fromDate).format('DD/MM/YYYY')} - ${dateTo ? dayjs(dateTo).format('DD/MM/YYYY') : 'Մինչև'}`
              : label}
          </Label>
        </LabelWrapper>
      </CalendarButton>

      <DatePickerContainer $visible={isCalendarVisible}>
        <Header>
          <TabButton $active={isFromSelected} onClick={() => setIsFromSelected(true)}>
            Սկսած
          </TabButton>
          <TabButton $active={!isFromSelected} onClick={() => setIsFromSelected(false)}>
            Մինչև
          </TabButton>
        </Header>

        <MonthNavigator>
          <ArrowButton onClick={handlePrevMonth} $visible>
            <img src={VectorLeft} alt="Prev month" />
          </ArrowButton>
          <span ref={monthRef} onClick={toggleMonthDropdown}>
            {selectedDate.toLocaleString('default', { month: 'long' })}
          </span>
          <ArrowButton onClick={handleNextMonth} $visible>
            <img src={VectorRight} alt="Next month" />
          </ArrowButton>
          {isMonthDropdownVisible && (
            <ScrollMonthContainer $isVisible ref={monthRef}>
              {months.map((month, index) => (
                <ScrollItem key={month} onClick={() => handleMonthSelect(index)}>
                  {month}
                </ScrollItem>
              ))}
            </ScrollMonthContainer>
          )}
        </MonthNavigator>

        <YearNavigator>
          <ArrowButton onClick={handlePrevYear} $visible={isFromSelected}>
            <img src={ArrowLeft} alt="Prev year" />
          </ArrowButton>
          <span ref={yearRef} onClick={toggleYearDropdown}>
            {selectedDate.getFullYear()}
          </span>
          <ArrowButton
            onClick={handleNextYear}
            $rotate={!isFromSelected}
            $visible={!isFromSelected}
          >
            <img src={ArrowLeft} alt="Next year" />
          </ArrowButton>
          {isYearDropdownVisible && (
            <ScrollYearContainer $isVisible ref={yearRef}>
              {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => {
                const year = 2000 + i;
                const isSelected = year === selectedDate.getFullYear();

                return (
                  <ScrollItem
                    key={year}
                    ref={isSelected ? selectedYearRef : null}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </ScrollItem>
                );
              })}
            </ScrollYearContainer>
          )}
        </YearNavigator>

        <DayLabels>
          {daysOfWeek.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </DayLabels>

        <DayGrid>{memoizedDays}</DayGrid>
      </DatePickerContainer>
    </DatePickerWrapper>
  );
};

export default DatePicker;
