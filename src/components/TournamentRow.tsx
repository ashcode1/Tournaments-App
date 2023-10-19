import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import Button from './Button';
import BodyText from './BodyText';
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
  showDeleteModal: () => void;
}

const TournamentRow: React.FC<TournamentsRowProps> = ({
  item,
  showModal,
  showDeleteModal,
}): JSX.Element => {
  const modalItem = useSelector(modalItemSelector);

  const appDispatch = useAppDispatch();

  const onEditPress = async () => {
    showModal();
    appDispatch(setModalItem(item));
  };

  const onUndoEditPress = () => {
    appDispatch(undoEdit(item.id));
  };

  const onDeletePress = () => {
    showDeleteModal();
    appDispatch(setModalItem(item));
  };
  return (
    <>
      <StyledView>
        <BodyText>Game: {item.game}</BodyText>
        <BodyText>Name: {item.name}</BodyText>
        <BodyText>Organizer: {item.organizer}</BodyText>
        <BodyText>
          Participants: current-{item.participants.current} max-
          {item.participants.max}
        </BodyText>
        <BodyText>Start date: {item.startDate}</BodyText>

        {item.id === modalItem.id ? (
          <Button onPress={onUndoEditPress}>UNDO CHANGES</Button>
        ) : (
          <Button onPress={onEditPress}>EDIT</Button>
        )}
        <Button onPress={onDeletePress}>DELETE</Button>
      </StyledView>
    </>
  );
};

export default TournamentRow;
