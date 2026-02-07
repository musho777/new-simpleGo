import { NoteText, NoteTitle, NoteWrapper } from './Components.styles';

export const Note = ({ title, description }) => {
  return (
    <NoteWrapper>
      <NoteTitle>{title}</NoteTitle>
      <NoteText>{description}</NoteText>
    </NoteWrapper>
  );
};
