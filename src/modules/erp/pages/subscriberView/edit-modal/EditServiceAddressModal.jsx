import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import CustomAutocomplete from 'common-ui/customAutocomplete';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import NumberInput from 'common-ui/numberInput';
import useDebounce from 'hooks/useDebounce';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import {
  searchBuildings,
  searchStreets,
  updateServiceAddresses,
} from '../../../features/main/mainActions';
import { serviceAddressModalSchema } from '../schema';

const EditServiceAddressModal = ({
  isOpen,
  onClose,
  customerId,
  serviceAddresses,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [streetOptions, setStreetOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedStreetId, setSelectedStreetId] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [streetSearchTerms, setStreetSearchTerms] = useState({});
  const debouncedStreetSearchTerms = useDebounce(streetSearchTerms, 300);
  const [buildingSearchTerms, setBuildingSearchTerms] = useState({});
  const debouncedBuildingSearchTerms = useDebounce(buildingSearchTerms, 300);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(serviceAddressModalSchema),
    defaultValues: {
      streetId: '',
      buildingId: '',
      flat: '',
      room: '',
      entrance: '',
      floor: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (isOpen && serviceAddresses && serviceAddresses.length > 0) {
      const firstAddress = serviceAddresses[0];
      reset({
        streetId: firstAddress.building?.street?.name || '',
        buildingId: firstAddress.building?.name || '',
        flat: firstAddress.flat || '',
        room: firstAddress.room || '',
        entrance: firstAddress.entrance || '',
        floor: firstAddress.floor || '',
        comment: firstAddress.comment || '',
      });
      if (firstAddress.building) {
        setSelectedBuilding(firstAddress.building);
        setSelectedStreetId(firstAddress.building.street?.id || null);
        // Set initial display values for street and building
        if (firstAddress.building.street) {
          setStreetOptions([
            {
              value: firstAddress.building.street.name.replace(/"/g, ''),
              label: firstAddress.building.street.name.replace(/"/g, ''),
              streetId: Number(firstAddress.building.street.id),
              street: firstAddress.building.street,
            },
          ]);
        }
        if (firstAddress.building) {
          setBuildingOptions([
            {
              value: firstAddress.building.name.replace(/"/g, ''),
              label: firstAddress.building.name.replace(/"/g, ''),
              buildingId: Number(firstAddress.building.id),
              building: firstAddress.building,
            },
          ]);
        }
      }
    }
  }, [isOpen, serviceAddresses, reset]);

  useEffect(() => {
    const searchTermsEntries = Object.entries(debouncedStreetSearchTerms);
    if (searchTermsEntries.length > 0) {
      searchTermsEntries.forEach(([index, searchTerm]) => {
        if (searchTerm && searchTerm.trim()) {
          dispatch(searchStreets(searchTerm.trim()))
            .unwrap()
            .then((data) => {
              const options = data.map((street) => ({
                value: street.name.replace(/"/g, ''),
                label: street.name.replace(/"/g, ''),
                streetId: Number(street.id),
                street: street,
              }));
              setStreetOptions(options);
            })
            .catch((error) => {
              console.error('Error fetching streets:', error);
              setStreetOptions([]);
            });
        }
      });
    }
  }, [debouncedStreetSearchTerms, dispatch]);

  useEffect(() => {
    const buildingSearchEntries = Object.entries(debouncedBuildingSearchTerms);
    if (buildingSearchEntries.length > 0) {
      buildingSearchEntries.forEach(([index, searchData]) => {
        if (searchData && searchData.streetId && searchData.name && searchData.name.trim()) {
          dispatch(
            searchBuildings({ streetId: searchData.streetId, name: searchData.name.trim() })
          )
            .unwrap()
            .then((data) => {
              const options = data.map((building) => ({
                value: building.name.replace(/"/g, ''),
                label: building.name.replace(/"/g, ''),
                buildingId: Number(building.id),
                building: building,
              }));
              setBuildingOptions(options);
            })
            .catch((error) => {
              console.error('Error fetching buildings:', error);
              setBuildingOptions([]);
            });
        }
      });
    }
  }, [debouncedBuildingSearchTerms, dispatch]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedStreetId(null);
      setSelectedBuilding(null);
      setStreetSearchTerms({});
      setBuildingSearchTerms({});
      setStreetOptions([]);
      setBuildingOptions([]);
    }
  }, [isOpen]);

  const handleSubmitServiceAddress = async (data) => {
    try {
      const serviceAddressData = [
        {
          building: selectedBuilding || { id: parseInt(data.buildingId) || 0 },
          flat: parseInt(data.flat) || null,
          room: parseInt(data.room) || null,
          entrance: parseInt(data.entrance) || null,
          floor: parseInt(data.floor) || null,
          comment: data.comment || '',
        },
      ];

      const result = await dispatch(
        updateServiceAddresses({
          id: customerId,
          serviceAddresses: serviceAddressData,
        })
      ).unwrap();

      notifySuccess('Service address updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating service address:', error);
      notifyError(error || 'Failed to update service address');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="800px">
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '20px', color: '#1d3557' }}>
          Ծառայությունների մատուցման հասցե
        </h3>

        <form onSubmit={handleSubmit(handleSubmitServiceAddress)}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <Controller
              name="streetId"
              control={control}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <CustomAutocomplete
                    {...field}
                    label="Փողոց"
                    placeholder="Փողոց"
                    options={streetOptions}
                    required
                    width="100%"
                    height="48px"
                    error={errors.streetId?.message}
                    onChange={(_, value) => {
                      field.onChange(value?.value || '');
                      setSelectedStreetId(value?.streetId || null);
                      setValue('buildingId', '');
                      setBuildingOptions([]);
                    }}
                    onInputChange={(_, inputValue) => {
                      setStreetSearchTerms({ 0: inputValue });
                    }}
                    freeSolo
                    filterOptions={(x) => x}
                  />
                </div>
              )}
            />

            <Controller
              name="buildingId"
              control={control}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <CustomAutocomplete
                    {...field}
                    label="Տուն"
                    placeholder="Տուն"
                    options={buildingOptions}
                    required
                    width="100%"
                    height="48px"
                    error={errors.buildingId?.message}
                    onChange={(_, value) => {
                      field.onChange(value?.value || '');
                      setSelectedBuilding(value?.building || null);
                    }}
                    onInputChange={(_, inputValue) => {
                      if (selectedStreetId && inputValue) {
                        setBuildingSearchTerms({
                          0: { streetId: selectedStreetId, name: inputValue },
                        });
                      }
                    }}
                    disabled={!selectedStreetId}
                    freeSolo
                    filterOptions={(x) => x}
                  />
                </div>
              )}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Controller
              name="flat"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Բն/Օֆիս"
                  placeholder="Բն/Օֆիս"
                  width="100%"
                  height="48px"
                  error={errors.flat?.message}
                />
              )}
            />
          </div>

          <div
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
          >
            <Controller
              name="room"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Սենյակի համար"
                  placeholder="համար"
                  width="200px"
                  error={errors.room?.message}
                />
              )}
            />

            <Controller
              name="entrance"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Մուտք"
                  placeholder="Մուտք"
                  width="200px"
                  error={errors.entrance?.message}
                  min={0}
                  max={999}
                />
              )}
            />

            <Controller
              name="floor"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Հարկ"
                  placeholder="Հարկ"
                  width="200px"
                  error={errors.floor?.message}
                  min={0}
                  max={999}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Մեկնաբանություն"
                  placeholder="Մեկնաբանություն"
                  width="100%"
                  error={errors.comment?.message}
                />
              )}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <Button outlined onClick={onClose} disabled={isSubmitting}>
              Չեղարկել
            </Button>
            <Button secondary type="submit" loading={isSubmitting}>
              Հաստատել
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditServiceAddressModal;
