import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import user from 'assets/header/user.svg';
import Pagination from 'common-ui/table/Pagination';
import TextEditor from 'common-ui/textEditor';
import { sendComment } from 'features/projectManagement/ProjectManagementActions';
import {
  selectLoading,
  selectSingleTicket,
  selectSuccess,
} from 'features/projectManagement/ProjectManagementSlice';
import { Avatar } from 'pages/teamManagement/membership/Membership.styles';
import { readableDateFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

import { CommentText, DetailInfo } from '../singleTicketView/SingleTicketView.styles';
import {
  CommentColumn,
  CommentCountTitle,
  CommentWrapper,
  Container,
  Row,
  RowSpace,
  TimeText,
} from './Comment.styles';

const schema = Yup.object({
  comment: Yup.string()
    .test('not-empty', '', (value) => {
      if (!value || value.trim() === '') {
        return true;
      }
      const textOnly = value.replace(/<[^>]*>/g, '').trim();
      return !!textOnly;
    })
    .test('text-length', 'Comment must be at least 3 characters long', (value) => {
      if (!value || value.trim() === '') {
        return true;
      }
      const textOnly = value.replace(/<[^>]*>/g, '').trim();
      return textOnly.length >= 3;
    })
    .max(10000, 'Comment must be less than 10000 characters'),
}).required();

const Comment = () => {
  const {
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      comment: '',
    },
  });
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = useSelector(selectLoading);
  const ticket = useSelector(selectSingleTicket);
  const success = useSelector(selectSuccess);
  const comments = ticket?.comments;
  const commentsPerPage = 8;
  const totalPages = Math.ceil((comments?.length || 0) / commentsPerPage);

  const handleSendCommentClick = (comment) => {
    dispatch(sendComment({ text: comment, uuid }));
  };

  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const paginatedComments = comments?.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (success.comment) {
      reset({ comment: '' });
    }
  }, [success.comment]);

  return (
    <Container>
      <Controller
        control={control}
        name="comment"
        defaultValue=""
        render={({ field }) => (
          <TextEditor
            {...field}
            label="Comments"
            errorText={errors.comment?.message}
            value={field.value}
            placeholder="Type your comment here..."
            sendButton={true}
            sendBtnDisabled={!isValid}
            loading={isLoading.comment}
            handleSendClick={(value) => {
              handleSendCommentClick(value);
            }}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />

      {comments?.length > 0 && (
        <>
          <CommentCountTitle>All comments ({comments?.length ?? 0})</CommentCountTitle>
          {paginatedComments?.map((comment, index) => (
            <CommentWrapper key={comment.id || `${comment.createdAt}-${index}`}>
              <CommentColumn>
                <RowSpace>
                  <Row>
                    <Avatar src={comment?.user?.photo ?? user} alt={comment?.name || 'User'} />
                    <DetailInfo>{comment?.user?.name}</DetailInfo>
                  </Row>
                  <TimeText>{readableDateFormat(comment.createdAt)}</TimeText>
                </RowSpace>
                <CommentText dangerouslySetInnerHTML={{ __html: comment.text }} />
              </CommentColumn>
            </CommentWrapper>
          ))}

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Comment;
