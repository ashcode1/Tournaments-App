import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import Button from './Button';
import Paragraph from './Paragraph';
import { useAppDispatch } from '../hooks';
import { Tournament } from '../reducers/tournaments';
import { modalItemSelector } from '../selectors/tournaments';
import { setModalItem, undoEdit } from '../actions/tournaments';

const StyledView = styled.View`
  height: 150px;
  margin-bottom: 10px;
`;

interface TournamentsRowProps {
  item: Tournament;
  showModal: () => void;
}

const TournamentRow: React.FC<TournamentsRowProps> = ({
  item,
  showModal,
}): JSX.Element => {
  const appDispatch = useAppDispatch();

  const modalItem = useSelector(modalItemSelector);

  const onEditPress = async () => {
    showModal();
    appDispatch(setModalItem(item));
  };

  const onUndoPress = () => {
    appDispatch(undoEdit(item.id));
  };
  return (
    <StyledView>
      <Paragraph>Game: {item.game}</Paragraph>
      <Paragraph>Name: {item.name}</Paragraph>
      <Paragraph>Organizer: {item.organizer}</Paragraph>
      <Paragraph>
        Participants: current-{item.participants.current} max-
        {item.participants.max}
      </Paragraph>
      <Paragraph>Start date: {item.startDate}</Paragraph>

      {item.id === modalItem.id ? (
        <Button onPress={onUndoPress}>UNDO CHANGES</Button>
      ) : (
        <Button onPress={onEditPress}>EDIT</Button>
      )}
    </StyledView>
  );
};

export default TournamentRow;
