import React from 'react';
import styled from 'styled-components/native';

import MultiDetailsRow from '../components/MultiDetailsRow';
import CardContainer from '../components/CardContainer';
import { Tournament } from '../reducers/tournaments';
import { formatDate } from '../helpers/dateHelpers';
import DetailsRow from '../components/DetailsRow';
import ScreenContainer from './ScreenContainer';
import H4 from '../components/H4';
import {
  AwardIcon,
  CalendarIcon,
  MonitorIcon,
  UserIcon,
  UsersIcon,
} from '../icons';

const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const TextContainer = styled.View`
  alignitems: flex-start;
  width: 90%;
`;

export type TournamentDetailsProps = {
  route: {
    params: {
      tournament: Tournament;
    };
  };
};

const TournamentDetails: React.FC<TournamentDetailsProps> = ({ route }) => {
  const { tournament } = route.params;
  const { name, game, organizer, participants, startDate } = tournament;

  return (
    <ScreenContainer>
      <CardContainer height={600}>
        <CenteredContainer>
          <AwardIcon />
        </CenteredContainer>
        <H4>{name}</H4>
        <TextContainer>
          <DetailsRow title="Game" value={game} icon={<MonitorIcon />} />
          <DetailsRow title="Organiser" value={organizer} icon={<UserIcon />} />
          <DetailsRow
            title="Start date"
            value={formatDate(startDate)}
            icon={<CalendarIcon />}
          />
          <MultiDetailsRow
            title="No. Participants"
            subTitle1="Current"
            subTitle2="Maximum"
            value1={participants.current}
            value2={participants.max}
            icon={<UsersIcon />}
          />
        </TextContainer>
      </CardContainer>
    </ScreenContainer>
  );
};

export default TournamentDetails;
