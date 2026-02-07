import { useState } from 'react';

import address from 'assets/customerManagement/address.svg';
import communication from 'assets/customerManagement/communication.svg';
import down from 'assets/customerManagement/down.svg';
import passportSvg from 'assets/customerManagement/passportSvg.svg';
import personalInfo from 'assets/customerManagement/personalInfo.svg';
import up from 'assets/customerManagement/up.svg';
import crmIcon from 'assets/customerManagement/userSvg.svg';

import {
  CrmIconWrapper,
  CustomerInfoWrapper,
  DataItem,
  DataKey,
  DataList,
  DataValue,
  Header,
  HeaderText,
  Icon,
  InfoSection,
  InfoSectionWrapper,
  SectionContent,
} from './Components.styles';

// Mock data for demonstration
const mockCustomerData = {
  personal: {
    fullName: 'Angelika Nighosyan',
    group: 'Individual Entrepreneur',
    dateOfBirth: '15.02.1991',
  },
  passport: {
    passportNumber: 'AN1234567',
    issuedBy: 'Police Department of Yerevan',
    issueDate: '10.05.2015',
    expiryDate: '10.05.2025',
  },
  communication: {
    email: 'angelika.nighosyan@example.com',
    phone: '+374 55 123 456',
    workPhone: '+374 10 234 567',
    mobile: '+374 77 345 678',
  },
  address: {
    residentialAddress: 'Mashtots Ave 25, Apt 12, Yerevan 0002, Armenia',
    registrationAddress: 'Mashtots Ave 25, Apt 12, Yerevan 0002, Armenia',
    billingAddress: 'Mashtots Ave 25, Apt 12, Yerevan 0002, Armenia',
  },
};

export const CustomerInfo = ({ data }) => {
  const [openSections, setOpenSections] = useState({
    personal: false,
    passport: false,
    communication: false,
    address: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 'personal',
      title: 'Personal info',
      icon: personalInfo,
      data: [
        { key: 'Full Name', value: data?.fullName },
        { key: 'Group', value: data?.customerGroup },
        { key: 'Date of birth', value: data?.dateOfBirth },
      ],
    },
    {
      id: 'passport',
      title: 'Passport info',
      icon: passportSvg,
      data: [
        { key: 'Passport Number', value: data?.passportNumber },
        { key: 'Date of Issue', value: data?.passportIssueDate },
        { key: 'Issued By', value: data?.passportIssuedBy },
        { key: 'Place of birth', value: data?.registrationAddress },
      ],
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: communication,
      data: [
        { key: 'Email', value: data?.email },
        { key: 'Phone', value: data?.phoneNumbers },
      ],
    },
    {
      id: 'address',
      title: 'Address info',
      icon: address,
      data: [
        {
          key: 'Service address',
          value: data?.serviceAddresses,
        },
        {
          key: 'Billing Address',
          value: data?.registrationAddress,
        },
      ],
    },
  ];

  return (
    <CustomerInfoWrapper>
      <Header>
        <CrmIconWrapper>
          <Icon src={crmIcon} alt="crmIcon" />
        </CrmIconWrapper>
        <HeaderText>
          <p>{data?.fullName}</p>
          <p>{data?.customerGroup}</p>
          <p>
            <span>Contract ID: </span>
            {data?.contractId}
          </p>
          <p>
            <span>ERP Customer ID: </span>
            {data?.customerId}
          </p>
        </HeaderText>
      </Header>
      <InfoSectionWrapper>
        {sections.map((section) => (
          <div key={section.id}>
            <InfoSection onClick={() => toggleSection(section.id)}>
              <Icon src={section.icon} alt={section.title} />
              <p>{section.title}</p>
              <Icon
                src={openSections[section.id] ? up : down}
                alt={openSections[section.id] ? 'Collapse' : 'Expand'}
              />
            </InfoSection>

            {openSections[section.id] && (
              <SectionContent>
                <DataList>
                  {section.data.map(
                    (item, index) =>
                      item.value && (
                        <DataItem key={index}>
                          <DataKey>{item.key}</DataKey>
                          <DataValue>
                            {Array.isArray(item.value)
                              ? item.value
                                  .flatMap((v) => v.split(','))
                                  .map((val, i) => <div key={i}>{val.trim()}</div>)
                              : item.value}
                          </DataValue>
                        </DataItem>
                      )
                  )}
                </DataList>
              </SectionContent>
            )}
          </div>
        ))}
      </InfoSectionWrapper>
    </CustomerInfoWrapper>
  );
};
