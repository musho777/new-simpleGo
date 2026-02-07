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
      {data.update?.work?.length > 0 && <Work />}
      {data.update?.home?.length > 0 && <Home />}
      {data.update?.billing?.length > 0 && <Billing />}
      {data.update?.service?.length > 0 && <Service />}
      {data.update?.delivery?.length > 0 && <PickupDelivery />}
    </>
  );
};

export default Addresses;
