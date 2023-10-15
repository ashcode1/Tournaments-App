import React from 'react';
import styled from 'styled-components/native';
import theme from '../theme';
import { Tournament } from '../reducers/tournaments';

const StyledView = styled.View`
  height: 100px;
  margin-bottom: 10px;
`;

const StyledText = styled.Text`
  color: ${theme.palette.text.primary};
`;

interface TournamentsRowProps {
  item: Tournament;
}

const TournamentRow: React.FC<TournamentsRowProps> = ({
  item,
}): JSX.Element => {
  return (
    <StyledView>
      <StyledText>Game: {item.game}</StyledText>
      <StyledText>Name: {item.name}</StyledText>
      <StyledText>Organizer: {item.organizer}</StyledText>
      <StyledText>
        Participants: current-{item.participants.current} max-
        {item.participants.max}
      </StyledText>
      <StyledText>Start date: {item.startDate}</StyledText>
    </StyledView>
  );
};

export default TournamentRow;
