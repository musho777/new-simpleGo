import { useEffect, useRef, useState } from 'react';

import { capitalizeFirstLetter } from 'utils';

import {
  Icon,
  Span,
  StatusContainer,
  StatusHeader,
  StatusItem,
  StatusList,
} from './StatusDropdown.styles';
import ArrowUp from './arrow-up.svg';
import ArrowDown from './arrow.svg';
import EditIconActive from './icon-active.svg';
import EditIcon from './icon.svg';

const widths = {
  status: 116,
  role: 173,
  occupation: 173,
};

const StatusDropdown = ({ type, options, onStatusClick, activeStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState('');
  const containerRef = useRef(null);

  const handleOptionClick = (status) => {
    onStatusClick(status.value || status.uuid);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const foundOption = options.find(
      (option) => option.value === activeStatus || option.uuid === activeStatus
    );
    setActiveLabel(foundOption?.label || foundOption?.name || capitalizeFirstLetter(type));
  }, [activeStatus, options, type]);

  const handleHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StatusContainer ref={containerRef} $isOpen={isOpen} $width={widths[type]}>
      <StatusHeader onClick={handleHeaderClick} $isOpen={isOpen}>
        <Span>
          <Icon src={isOpen ? EditIconActive : EditIcon} alt="a" />
          {activeLabel}
        </Span>
        <Icon src={isOpen ? ArrowUp : ArrowDown} alt="a" />
      </StatusHeader>
      <StatusList $isOpen={isOpen}>
        {options?.map((status, index) => (
          <StatusItem
            key={index}
            onClick={() => handleOptionClick(status)}
            className={activeStatus === status.value ? 'active' : ''}
          >
            {status.label || status.name}
          </StatusItem>
        ))}
      </StatusList>
    </StatusContainer>
  );
};

export default StatusDropdown;
