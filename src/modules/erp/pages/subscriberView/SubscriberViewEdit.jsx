import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { Select } from 'common-ui/select';

import { getCustomer } from '../../features/main/mainActions';
import {
  Container,
  CustomerSection,
  ErrorText,
  InputGroup,
  LoadingText,
  SearchSection,
  WarningText,
} from './SubscriberViewEdit.styles';

const SUBSCRIBER_TYPES = [
  {
    id: 1,
    name: 'Ֆիզիկական անձ',
  },
  {
    id: 2,
    name: 'Իրավաբանական անձ',
  },
  {
    id: 3,
    name: 'Անհատ ձեռներեց',
  },
];

const SubscriberViewEdit = () => {
  const [subscriberId, setSubscriberId] = useState('');
  const [selectedSubscriberType, setSelectedSubscriberType] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [subscriberData, setSubscriberData] = useState(null);
  const [error, setError] = useState(null);
  const [subscriberTypeWarning, setSubscriberTypeWarning] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSubscriberType || !selectedSubscriberType.value) {
      setError('Please select a subscriber type');
      return;
    }

    if (!subscriberId.trim()) {
      setError('Please enter a subscriber ID');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSubscriberData(null);
    setSubscriberTypeWarning(null);

    try {
      const result = await dispatch(getCustomer(subscriberId.trim())).unwrap();
      setSubscriberData(result);

      if (result.customerType && selectedSubscriberType) {
        const selectedTypeId = parseInt(selectedSubscriberType.value);
        const apiTypeId = result.customerType.id;

        if (selectedTypeId !== apiTypeId) {
          const apiSubscriberType = SUBSCRIBER_TYPES.find((type) => type.id === apiTypeId);
          setSubscriberTypeWarning({
            selected: selectedSubscriberType.label,
            actual: apiSubscriberType?.name || 'Unknown',
            message: `Warning: Selected subscriber type "${selectedSubscriberType.label}" doesn't match the actual subscriber type "${apiSubscriberType?.name || 'Unknown'}" from the database.`,
          });
        }
      }

      if (result.customerType) {
        const subscriberTypeId = result.customerType.id;
        const navigationPath = `/erp/subscriber/${subscriberId.trim()}/individual`;

        switch (subscriberTypeId) {
          case 1: // Ֆիզիկական անձ (Physical Person)
            console.log('Navigating to individual subscriber view...');
            navigate(`/erp/subscriber/${subscriberId.trim()}/individual`);
            break;
          case 2: // Իրավաբանական անձ (Legal Entity)
            console.log('Navigating to legal entity subscriber view...');
            navigate(`/erp/subscriber/${subscriberId.trim()}/legal-entity-view`);
            break;
          case 3: // Անհատ ձեռներեց (Individual Entrepreneur)
            console.log('Navigating to entrepreneur subscriber view...');
            navigate(`/erp/subscriber/${subscriberId.trim()}/entrepreneur`);
            break;
          default:
            console.log('Unknown subscriber type:', subscriberTypeId);
        }
      } else {
        console.log('No subscriber type found in result');
      }
    } catch (err) {
      setError(err || 'Failed to fetch subscriber data');
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    setSubscriberId(e.target.value);
    if (error) setError(null);
  };

  return (
    <Container>
      <SearchSection>
        <h1>Բաժանորդի Անհատական Էջ</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <div className="select-container">
              <Select
                label="Բաժանորդի տեսակ"
                placeholder="Ընտրել բաժանորդի"
                options={SUBSCRIBER_TYPES}
                value={selectedSubscriberType}
                onChange={(selected) => {
                  setSelectedSubscriberType(selected);
                  if (error) setError(null);
                }}
                isDisabled={isSearching}
                isClearable={false}
                req={true}
              />
            </div>
            <div className="input-container">
              <Input
                label="Բաժանորդի ID"
                placeholder="Բաժանորդի ID"
                value={subscriberId}
                onChange={handleInputChange}
                disabled={isSearching}
                required
              />
            </div>
            <Button
              secondary
              width={122}
              type="submit"
              disabled={isSearching || !selectedSubscriberType}
              loading={isSearching}
            >
              Որոնում
            </Button>
          </InputGroup>
        </form>
        {error && <ErrorText>{error}</ErrorText>}
      </SearchSection>

      {isSearching && <LoadingText>Loading subscriber data...</LoadingText>}

      {subscriberData && (
        <CustomerSection>
          {subscriberTypeWarning && (
            <WarningText>
              <strong>Subscriber Type Mismatch:</strong>
              <br />
              Selected: {subscriberTypeWarning.selected}
              <br />
              Actual: {subscriberTypeWarning.actual}
            </WarningText>
          )}
          <h2>
            Subscriber Information -{' '}
            {subscriberData.customerType?.name ||
              selectedSubscriberType?.label ||
              'Unknown Type'}
          </h2>
          <div className="subscriber-data">
            <pre>{JSON.stringify(subscriberData, null, 2)}</pre>
          </div>
          <p>View and edit functionality will be implemented here based on subscriber type.</p>
        </CustomerSection>
      )}
    </Container>
  );
};

export default SubscriberViewEdit;
