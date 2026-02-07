import { useSelector } from 'react-redux';

import { selectContactsById } from 'features/profile/profileSlice';

import Email from './email';
import Mobile from './mobile';
import Phone from './phone';

const Contacts = () => {
  const data = useSelector(selectContactsById);

  return (
    <>
      {data.new?.emails?.length > 0 && <Email />}
      {data.new?.mobilePhones?.length > 0 && <Mobile />}
      {data.new?.phones?.length > 0 && <Phone />}
    </>
  );
};

export default Contacts;
