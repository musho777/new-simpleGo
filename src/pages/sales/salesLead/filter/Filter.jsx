import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import MyRadioGroup from 'common-ui/radioGroup';
import { Select } from 'common-ui/select';
import { getWorkflowStatusesByPrivilege, nextLeadStep } from 'features/sales/salesActions';
import { selectWorkflowStatusesByPrivilege, setResetAll } from 'features/sales/salesSlice';
import { generateOptions } from 'utils';

import UpdateStatus from '../components/UpdateStatus';
import {
  ButtonWrapper,
  ChangeStatusDiv,
  Div,
  FilterActions,
  FilterContainer,
  NextStatusWrapper,
  SearchButtonWrapper,
  StatusDiv,
  TooltipText,
} from './Filter.styles';

const Filter = ({ status, leadId, currentStatus }) => {
  const navigate = useNavigate();
  const [option, setOption] = useState('random');
  const [updateStatus, setUpdateStatus] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(),
    shouldFocusError: false,
  });
  const dispatch = useDispatch();
  const workflowStatusesByPrivilege = useSelector(selectWorkflowStatusesByPrivilege);
  const selectedStatus = watch('status');
  const handleChange = () => {
    dispatch(
      nextLeadStep({
        leadId: leadId,
        data: {
          option: option,
          currentStatusId: selectedStatus?.value,
        },
      })
    )
      .unwrap()
      .then((nextLead) => {
        if (nextLead.leadId) {
          dispatch(setResetAll());
          navigate(`/leads/${nextLead.leadId}`, { replace: true });
        } else {
          navigate(-1);
        }
      });
  };

  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    dispatch(getWorkflowStatusesByPrivilege({}));
  }, [dispatch, leadId]);

  useEffect(() => {
    if (!selectedStatus) {
      if (currentStatus) {
        reset({
          status: {
            label: currentStatus.name,
            value: currentStatus.uuid,
          },
        });
      } else {
        reset({
          status: null,
        });
      }
    }
  }, [currentStatus, reset]);

  return (
    <FilterContainer>
      <FilterActions>
        <Div>
          <MyRadioGroup
            value={option}
            options={[
              { label: 'Random', value: 'random' },
              { label: 'Ascending', value: 'ascending' },
              { label: 'Descending', value: 'descending' },
            ]}
            onChange={handleChangeOption}
            row={true}
          />
        </Div>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <StatusDiv>
              <Select
                {...field}
                label="‎"
                $error={errors.branchHeadId?.message}
                options={generateOptions(workflowStatusesByPrivilege?.items)}
                placeholder="Status"
                maxMenuHeight={180}
              />
            </StatusDiv>
          )}
        />
        <SearchButtonWrapper>
          <Button onClick={() => handleChange()} width="90px" height="38px" secondary>
            Search Lead
          </Button>
        </SearchButtonWrapper>
      </FilterActions>
      <NextStatusWrapper>
        <ChangeStatusDiv>
          <ButtonWrapper>
            <Button
              disabled={currentStatus?.outcomeType === 'converted'}
              onClick={() => setUpdateStatus(true)}
              secondary
            >
              Update status
            </Button>
            {currentStatus?.outcomeType === 'converted' && (
              <TooltipText className="tooltip-text">
                Disabled: sales outcome <br /> type is converted
              </TooltipText>
            )}
          </ButtonWrapper>
        </ChangeStatusDiv>
      </NextStatusWrapper>
      <UpdateStatus
        onClose={() => setUpdateStatus(false)}
        isOpen={updateStatus}
        status={status}
        leadId={leadId}
        option={option}
        currentStatus={currentStatus}
        selectedStatus={selectedStatus}
      />
    </FilterContainer>
  );
};

export default Filter;
