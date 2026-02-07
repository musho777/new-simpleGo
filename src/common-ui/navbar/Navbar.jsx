import { Fragment, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import arrowActiveDown from 'assets/dashboard/arrow-down-active.svg';
import arrowDown from 'assets/dashboard/arrow-down-navbar.svg';
import arrowActiveUp from 'assets/dashboard/arrow-up-active.svg';
import arrowUp from 'assets/dashboard/arrow-up-navbar.svg';
import collapsLogo from 'assets/dashboard/collaps-logo.svg';
import leftArrow from 'assets/dashboard/left-arrow.svg';
import logo from 'assets/dashboard/logo.svg';
import rightArrow from 'assets/dashboard/right-arrow.svg';
import SubmenuIconActive from 'assets/dashboard/submenu-active.svg';
import SubmenuIcon from 'assets/dashboard/submenu.svg';
import { SYSTEM_USERS } from 'constants/constants';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  selectCollapsNavbar,
  selectShowNavbar,
  setCollapsNavbar,
  setShowNavbar,
} from 'features/components/componentsSlice';
import { getSalesProjects } from 'features/sales/salesActions';
import { selectSalesProjects } from 'features/sales/salesSlice';

import { SIDEBAR_ITEMS } from './Items';
import {
  ArrowWrapper,
  CloseWrapper,
  Collapse,
  Icon,
  IconWrapper,
  LogoWrapper,
  NavbarTooltip,
  NavbarTooltipContainer,
  Row,
  SidebarContainer,
  SidebarItem,
  SidebarItemWrapper,
  SidebarMenu,
  Span,
  SubmenuContainer,
} from './Navbar.styles';
import close from './close.svg';

const filterSubmenu = (submenu, parentName, userEmail, userRole, salesProjects = []) => {
  // Special case for Inventory - these emails see all submenus
  if (parentName === 'Inventory') {
    if (
      userEmail === 'anjela.ohanyan@fnet.am' ||
      userEmail === 'hovhannes.hakobyan@fnet.am' ||
      userEmail === 'liza.badalova@fnet.am'
    ) {
      return submenu; // Return all submenus without filtering
    }
  }

  if (parentName === 'Billing Reports') {
    // For Super Admin, show all submenus
    if (userRole === 'Super Admin') {
      return submenu.filter(
        (item) => item.roles?.includes('*') || item.roles?.includes(userRole)
      );
    }

    if (userEmail === 'sona.madoyan@fnet.am') {
      return submenu.filter((item) => item.name === 'Marketing Reports');
    }

    // For specific emails, filter based on their access
    if (userEmail === 'alisa.gazaryan@fnet.am') {
      return submenu.filter((item) => item.name === 'B2C');
    }

    if (userEmail === 'silva.achemyan@fnet.am') {
      return submenu.filter((item) => item.name === 'B2B');
    }
  }

  // Default filtering for other menus
  return submenu
    .filter((item) => {
      if (item.roles?.includes('*')) return true;
      if (item.roles?.includes(userRole)) return true;
      return false;
    })
    .map((item) => {
      // Disable Sales Report menu when projects array is empty
      if (parentName === 'Sales' && item.name === 'Report') {
        return {
          ...item,
          disabled: !salesProjects || salesProjects.length === 0,
        };
      }
      return item;
    });
};

const getSidebarItems = (userRole, userEmail, salesProjects) => {
  const filterByRole = (items) => {
    return items
      .filter((item) => {
        if (item.roles?.includes('*')) return true;

        // Special case for Inventory - these emails always see it
        if (item.name === 'Inventory') {
          if (
            userEmail === 'anjela.ohanyan@fnet.am' ||
            userEmail === 'hovhannes.hakobyan@fnet.am' ||
            userEmail === 'liza.badalova@fnet.am'
          ) {
            return true;
          }
        }

        if (item.roles?.includes(userRole)) {
          if (item.name === 'Inventory' && userRole === 'Department Head') {
            return (
              userEmail === 'anjela.ohanyan@fnet.am' ||
              userEmail === 'hovhannes.hakobyan@fnet.am' ||
              userEmail === 'liza.badalova@fnet.am'
            );
          }
          return true;
        }
        if (item.name === 'Billing Reports') {
          return (
            userRole === 'Super Admin' ||
            userEmail === 'alisa.gazaryan@fnet.am' ||
            userEmail === 'silva.achemyan@fnet.am' ||
            userEmail === 'sona.madoyan@fnet.am'
          );
        }
        return false;
      })
      .map((item) => {
        // Modify billing reports navigation for specific users
        if (item.name === 'Billing Reports') {
          let customTo = item.to;
          if (userEmail === 'alisa.gazaryan@fnet.am') {
            customTo = '/billing/b2c';
          } else if (userEmail === 'silva.achemyan@fnet.am') {
            customTo = '/billing/b2b';
          } else if (userEmail === 'sona.madoyan@fnet.am') {
            customTo = '/billing/marketingReports';
          }

          return {
            ...item,
            to: customTo,
            submenu: item.submenu
              ? filterSubmenu(item.submenu, item.name, userEmail, userRole, salesProjects)
              : undefined,
          };
        }

        return {
          ...item,
          submenu: item.submenu
            ? filterSubmenu(item.submenu, item.name, userEmail, userRole, salesProjects)
            : undefined,
        };
      });
  };

  return filterByRole(SIDEBAR_ITEMS);
};

const order = [
  'Dashboard',
  'User Management',
  'Departments',
  'Branches',
  'Projects',
  'Teams',
  'Project Management',
  'Settings',
  'Archive',
  'Reports',
  'Billing Reports',
  'Inventory',
  'Sales',
  'Finance Request',
  'CRM',
  'ERP',
  'Quiz',
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const showNavbar = useSelector(selectShowNavbar);
  const collapsNavbar = useSelector(selectCollapsNavbar);
  const userInfo = useSelector(selectUserInfo);
  const salesProjects = useSelector(selectSalesProjects);
  const userType = localStorage.getItem('userType');
  const userEmail = userInfo?.email;
  const sidebarItems = getSidebarItems(userType, userEmail, salesProjects).sort((a, b) => {
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const { uuid } = useParams();

  useEffect(() => {
    dispatch(getSalesProjects());
  }, [dispatch]);

  const [hoveredItem, setHoveredItem] = useState(null);
  const menuRef = useRef(null);

  const handleNavbarClick = (item) => {
    if (item?.submenu) {
      dispatch(setCollapsNavbar(false));
    }
    dispatch(setShowNavbar(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(setShowNavbar(false));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const Tooltip = ({ children, text, hovered }) => (
    <NavbarTooltipContainer className="relative group">
      {children}
      {hovered && <NavbarTooltip>{text}</NavbarTooltip>}
    </NavbarTooltipContainer>
  );

  const renderSubmenu = (submenuItems, parentRoute, depth = 0) => (
    <SubmenuContainer className={`submenu-depth-${depth}`}>
      {submenuItems?.map((item, index) => {
        const paths = [
          uuid ? `${item.route}/${uuid}` : item.route,
          `${item.route}/sub`,
          `${item.route}/assign`,
          `${item.route}/sub/assign`,
          `${item.route}/create-edit`,
          `${item.route}/create-edit/${uuid}`,
        ];

        const isActive = Array.isArray(item.route)
          ? item.route.some((route) => location.pathname.startsWith(route))
          : location.pathname.startsWith(item.route);

        const hasSubmenu = !!item.submenu;
        const isDisabled = item.disabled;

        return (
          <Fragment key={`${parentRoute}-${index}`}>
            <Row>
              <Icon
                src={isActive ? SubmenuIconActive : SubmenuIcon}
                alt="sub"
                className={`submenu-icon-depth-${depth}`}
              />
              <SidebarItem
                as={isDisabled ? 'div' : undefined}
                to={
                  isDisabled
                    ? undefined
                    : Array.isArray(item.route)
                      ? item.route[0]
                      : item.route
                }
                $active={isActive}
                $submenu
                $disabled={isDisabled}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  if (location.pathname === item.route) {
                    e.preventDefault();
                    dispatch(setShowNavbar(false));
                    return;
                  }
                  dispatch(setShowNavbar(false));
                }}
              >
                {item.name}
              </SidebarItem>
            </Row>
            {hasSubmenu &&
              location.pathname.startsWith(item.route) &&
              renderSubmenu(item.submenu, `${parentRoute}-${index}`, depth + 1)}
          </Fragment>
        );
      })}
    </SubmenuContainer>
  );
  return (
    <SidebarContainer $collapsed={collapsNavbar} $showNavbar={showNavbar} ref={menuRef}>
      <CloseWrapper onClick={() => dispatch(setShowNavbar(false))}>
        <Icon src={close} alt="close" />
      </CloseWrapper>
      <LogoWrapper>
        {collapsNavbar ? (
          <Icon src={collapsLogo} alt="logo" className="collaps-logo w-261" />
        ) : (
          <Icon src={logo} alt="logo" className="mt-mb w-261" />
        )}
      </LogoWrapper>

      <Collapse>
        <ArrowWrapper tabIndex={0} onClick={() => dispatch(setCollapsNavbar(!collapsNavbar))}>
          <Icon src={!collapsNavbar ? leftArrow : rightArrow} alt="collaps" />
        </ArrowWrapper>
      </Collapse>
      <SidebarMenu>
        {sidebarItems.map((item, index) => {
          const isHovered = hoveredItem === index;
          const isActive = SYSTEM_USERS.includes(userType)
            ? location.pathname === (uuid ? `${item.route}/${uuid}` : item.route) ||
              location.pathname === `${item.route}/membership`
            : (item.route === '/finance-request'
                ? location.pathname.startsWith('/finance-request') ||
                  location.pathname.startsWith('/finance-reports')
                : location.pathname.startsWith(item.route)) &&
              !location.pathname.includes('archive') &&
              !location.pathname.includes('/project/') &&
              !location.pathname.includes('/project-management/') &&
              !location.pathname.includes('/billing/');
          return (
            <Fragment key={index}>
              {collapsNavbar ? (
                <Tooltip text={item.name} hovered={isHovered}>
                  <SidebarItem
                    $collapsed={collapsNavbar}
                    as={item.isRoute === false && 'div'}
                    to={item.to ?? item.route}
                    $active={isActive}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={(e) => {
                      if (location.pathname === (item.to ?? item.route)) {
                        e.preventDefault();
                        dispatch(setShowNavbar(false));
                        return;
                      }
                      handleNavbarClick();
                    }}
                  >
                    <SidebarItemWrapper>
                      <IconWrapper>
                        <Icon
                          style={{ width: '27px' }}
                          src={
                            isActive || isHovered ? item?.icons?.active : item?.icons?.default
                          }
                          alt={item.name}
                        />
                      </IconWrapper>
                    </SidebarItemWrapper>
                  </SidebarItem>
                </Tooltip>
              ) : (
                <SidebarItem
                  as={item.isRoute === false && 'div'}
                  to={item.to ?? item.route}
                  $active={isActive}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => {
                    if (location.pathname === (item.to ?? item.route)) {
                      e.preventDefault();
                      dispatch(setShowNavbar(false));
                      return;
                    }
                    handleNavbarClick();
                  }}
                >
                  <SidebarItemWrapper>
                    <IconWrapper>
                      <Icon
                        src={
                          isActive || isHovered ? item?.icons?.active : item?.icons?.default
                        }
                        alt={item.name}
                      />
                    </IconWrapper>
                    <Span $collapsed={collapsNavbar}>{item.name}</Span>
                  </SidebarItemWrapper>
                  {item?.submenu && item?.submenu?.length !== 0 && !collapsNavbar && (
                    <Icon
                      src={
                        location.pathname.startsWith(item.route)
                          ? location.pathname.endsWith(item.route) || isHovered
                            ? arrowActiveUp
                            : arrowUp
                          : isHovered
                            ? arrowActiveDown
                            : arrowDown
                      }
                      alt={item.name}
                    />
                  )}
                </SidebarItem>
              )}
              {item?.submenu &&
                item?.submenu?.length !== 0 &&
                !collapsNavbar &&
                location.pathname.startsWith(item.route) &&
                renderSubmenu(item.submenu, index)}
            </Fragment>
          );
        })}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Navbar;
