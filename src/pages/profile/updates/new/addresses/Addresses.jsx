import React from 'react';

import { useSelector } from 'react-redux';

import { selectAddressesById } from 'features/profile/profileSlice';

import Billing from './billing';
import Home from './home';
import PickupDelivery from './pickupDelivery';
import Service from './service';
import Work from './work';

const Addresses = () => {
  const data = useSelector(selectAddressesById);

  return (
    <>
      {data.new?.work?.length > 0 && <Work />}
      {data.new?.home?.length > 0 && <Home />}
      {data.new?.billing?.length > 0 && <Billing />}
      {data.new?.service?.length > 0 && <Service />}
      {data.new?.delivery?.length > 0 && <PickupDelivery />}
    </>
  );
};

export default Addresses;
