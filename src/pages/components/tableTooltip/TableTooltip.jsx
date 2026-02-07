import { useEffect, useRef, useState } from 'react';

import user from 'assets/header/user.svg';
import { Avatar } from 'pages/teamManagement/membership/Membership.styles';

import { Row, Span, TooltipIcon, TooltipText, TooltipWrapper } from './TableTooltip.styles';
import icon from './icon.svg';

const TableTooltip = ({ children, data, type, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsHovered((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <TooltipWrapper ref={wrapperRef}>
      <Span onClick={handleToggle}>{children}</Span>
      <TooltipText
        $isVisible={isHovered && data?.length !== 0 && data !== undefined}
        $index={index}
      >
        {data?.map((item) => (
          <Row key={item.uuid}>
            {type !== 'assignee' && <TooltipIcon src={icon} alt="warning" />}
            {item?.district?.name}
            {item?.region?.name}
            {item?.photo && <Avatar src={item.photo ?? user} alt={item.name} />}
            {item?.name}
          </Row>
        ))}
      </TooltipText>
    </TooltipWrapper>
  );
};

export default TableTooltip;
