import { useSearchParams } from 'react-router-dom';

import IndividualForm1 from './IndividualForm1';
import IndividualForm2 from './IndividualForm2';

const IndividualFormWrapper = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');

  if (step === '2') {
    return <IndividualForm2 />;
  }

  return <IndividualForm1 />;
};

export default IndividualFormWrapper;
