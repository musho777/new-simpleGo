import { useSelector } from 'react-redux';

import { selectContactsById } from 'features/profile/profileSlice';

import Email from './email';
import MainPhone from './mainPhone';
import Mobile from './mobile';
import Phone from './phone';

const Contacts = () => {
  const data = useSelector(selectContactsById);

  return (
    <>
      {data.update?.emails?.length > 0 && <Email />}
      {data.update?.mobilePhones?.length > 0 && <Mobile />}
      {data.update?.phones?.length > 0 && <Phone />}
      {data.update?.mainPhone?.uuid && <MainPhone />}
    </>
  );
};

export default Contacts;
