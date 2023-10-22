/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from 'react-native';

import H6 from './H6';
import theme from '../theme';
import Button from './Button';
import BodyText from './BodyText';
import CardContainer from './CardContainer';
import { useAppDispatch } from '../hooks';
import { formatDate } from '../helpers/dateHelpers';
import { Tournament } from '../reducers/tournaments';
import { modalItemSelector } from '../selectors/tournaments';
import { setModalItem, undoEdit } from '../actions/tournaments';
import { calcWidthPercentage } from '../helpers/layoutHelpers';

const ButtonRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonLeft = styled(Button)`
  padding-right: ${theme.spacing()};
  min-width: 100px;
`;

const ButtonRight = styled(Button)`
  padding-left: ${theme.spacing()};
  min-width: 100px;
`;

interface TournamentsRowProps {
  item: Tournament;
  showModal: () => void;
  showDeleteModal: () => void;
  onTournamentPress: (tournament: Tournament) => void;
}

const TournamentRow: React.FC<TournamentsRowProps> = ({
  item,
  showModal,
  showDeleteModal,
  onTournamentPress,
}): JSX.Element => {
  const { width } = useWindowDimensions();

  const [itemWidth, setItemWidth] = React.useState<string>(
    calcWidthPercentage(width)
  );

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

  const onContainerPress = () => {
    onTournamentPress(item);
  };

  const date = formatDate(item.startDate);

  React.useEffect(() => {
    setItemWidth(calcWidthPercentage(width));
  }, [width]);

  return (
    <CardContainer width={itemWidth} onPress={onContainerPress}>
      <H6>{item.name}</H6>
      <BodyText>Start date: {date}</BodyText>

      <ButtonRow>
        {item.id === modalItem.id ? (
          <ButtonLeft onPress={onUndoEditPress}>UNDO CHANGES</ButtonLeft>
        ) : (
          <ButtonLeft onPress={onEditPress}>EDIT</ButtonLeft>
        )}
        <ButtonRight onPress={onDeletePress}>DELETE</ButtonRight>
      </ButtonRow>
    </CardContainer>
  );
};

export default TournamentRow;
