import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
  Avatar,
  Box,
  AvatarGroup as MuiAvatarGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { selectUserInfo } from 'features/auth/authSlice';

const AvatarGroup = ({ data, maxVisible = 4, index }) => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const myUuid = userInfo?.uuid;
  const location = useLocation();
  const visible = data.slice(0, maxVisible);
  const extra = data.slice(maxVisible);

  const handleClickAvatar = (e, member) => {
    e.stopPropagation();
    e.preventDefault();
    const id = member.uuid || member.userId;
    if (!member.isTeam) {
      navigate(`/profile/contacts${id === myUuid ? '' : `/${id}`}`, {
        state: { from: location.pathname },
      });
    }
  };

  if (data?.length === 1) {
    const member = data[0];
    const showTooltip = member?.name?.length > 20;

    const content = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1,
          borderRadius: 3,
          '&:hover': {
            backgroundColor: '#f8f8f8',
            cursor: !member.isTeam ? 'pointer' : 'default',
          },
        }}
        onClick={(e) => handleClickAvatar(e, member)}
      >
        <Avatar src={member.photo} alt={member.name} sx={{ width: 28, height: 28 }} />
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '180px',
          }}
        >
          {member.name}
        </Typography>
      </Box>
    );

    return showTooltip ? (
      <Tooltip
        title={member.name}
        arrow
        placement="top-start"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: '#1D3557',
              color: '#fff',
              fontSize: '0.875rem',
            },
          },
          arrow: {
            sx: { color: '#1D3557' },
          },
        }}
      >
        <span>{content}</span>
      </Tooltip>
    ) : (
      content
    );
  }

  return (
    <MuiAvatarGroup
      sx={{
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          fontSize: '12px',
        },
      }}
    >
      {visible.map((member, index) => (
        <Fragment key={`member-${index}`}>
          <Tooltip
            title={member.name}
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#1D3557',
                  color: '#fff',
                  fontSize: '0.875rem',
                },
              },
              arrow: {
                sx: { color: '#1D3557' },
              },
            }}
          >
            <Avatar
              alt={member.name}
              src={member.photo}
              onClick={(e) => handleClickAvatar(e, member)}
              sx={{
                '&:hover': {
                  backgroundColor: !member.isTeam ? '#cfcfcf' : 'default',
                  cursor: !member.isTeam ? 'pointer' : 'default',
                },
              }}
            />
          </Tooltip>
        </Fragment>
      ))}

      {extra.length > 0 && (
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                p: 2,
                bgcolor: '#FFF',
                boxShadow: '0px 0px 28px 0px rgba(0, 0, 0, 0.15)',
                borderRadius: '10px',
              },
            },
            arrow: {
              sx: { color: '#FFF' },
            },
          }}
          title={
            <Box
              sx={{
                maxHeight: 180,
                overflowY: 'auto',
                borderRadius: '10px',
                background: '#FFF',
                padding: '2px',
                color: '#000',
                wordBreak: 'break-word',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              {extra.map((member, i) => (
                <Box
                  key={`extra-${i}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: '#f8f8f8',
                      cursor: !member.isTeam ? 'pointer' : 'default',
                    },
                  }}
                  onClick={(e) => handleClickAvatar(e, member)}
                >
                  <Avatar
                    src={member.photo}
                    alt={member.name}
                    sx={{ width: 28, height: 28 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '180px',
                    }}
                  >
                    {member.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          }
          arrow
          placement={index < 4 ? 'bottom' : 'top'}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '12px',
              bgcolor: '#1D3557',
            }}
          >
            +{extra.length}
          </Avatar>
        </Tooltip>
      )}
    </MuiAvatarGroup>
  );
};

export default AvatarGroup;
