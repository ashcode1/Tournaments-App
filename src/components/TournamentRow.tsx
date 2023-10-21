/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import H6 from './H6';
import theme from '../theme';
import Button from './Button';
import BodyText from './BodyText';
import { useAppDispatch } from '../hooks';
import { formatDate } from '../helpers/dateHelpers';
import { Tournament } from '../reducers/tournaments';
import { modalItemSelector } from '../selectors/tournaments';
import { setModalItem, undoEdit } from '../actions/tournaments';
import { useWindowDimensions } from 'react-native';

const Container = styled.View<{ width?: string }>`
  ${(props) => `
    width: ${props.width ? props.width : '100%'};
    padding-horizontal: ${theme.spacing(4)};
    height: 150px;
  `}
`;

const StyledView = styled.View`
  height: 150px;
  padding: ${theme.spacing(2)}
  margin-vertical: ${theme.spacing(3)};
  background: ${theme.palette.background.alt2}
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: ${theme.borderRadius}
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

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
}

const TournamentRow: React.FC<TournamentsRowProps> = ({
  item,
  showModal,
  showDeleteModal,
}): JSX.Element => {
  const { width } = useWindowDimensions();

  const [itemWidth, setItemWidth] = React.useState<string>(
    calcWidthPercentage()
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

  const date = formatDate(item.startDate);

  React.useEffect(() => {
    setItemWidth(calcWidthPercentage);
  }, [width]);

  function calcWidthPercentage() {
    let widthPercentage;
    if (width > 720) {
      widthPercentage = '50%';
    } else {
      widthPercentage = '100%';
    }
    return widthPercentage;
  }

  return (
    <Container width={itemWidth}>
      <StyledView>
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
      </StyledView>
    </Container>
  );
};

export default TournamentRow;
