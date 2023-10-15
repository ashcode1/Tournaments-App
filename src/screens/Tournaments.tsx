/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import theme from '../theme';
import TournamentRow from '../components/TournamentRow';
import ScreenContainer from './ScreenContainer';
import { errorSelector } from '../selectors/errors';
import { createLoadingSelector } from '../selectors/loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GET_TOURNAMENTS, getTournaments } from '../actions/tournaments';
import {
  moreTournamentsToFetchSelector,
  tournamentsPageSelector,
  tournamentsSelector,
} from '../selectors/tournaments';

const Tournaments: React.FC = (): JSX.Element => {
  const appDispatch = useAppDispatch();

  const tournaments = useAppSelector(tournamentsSelector);
  const page = useAppSelector(tournamentsPageSelector);
  const moreToFetch = useAppSelector(moreTournamentsToFetchSelector);
  const isLoading = useAppSelector(createLoadingSelector([GET_TOURNAMENTS]));
  const error = useAppSelector(errorSelector([GET_TOURNAMENTS]));

  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const limit = 10;

  const fetchInitial = () => appDispatch(getTournaments(1, limit));

  const onEndReached = () => {
    if (!isLoading && moreToFetch) {
      appDispatch(getTournaments(page, limit));
    }
  };

  const onRetryPress = () => fetchInitial();

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchInitial();
  };

  React.useEffect(() => {
    fetchInitial();
  }, []);

  React.useEffect(() => {
    if (isRefreshing && isLoading === false) {
      setIsRefreshing(false);
    }
  }, [isLoading]);

  return (
    <ScreenContainer
      screenTitle="Faceit Tournaments"
      loading={
        // Initial Fetch
        (isLoading && tournaments === null) ||
        // Pull to refresh
        (isLoading && isRefreshing)
      }
      loadingText="Loading tournaments..."
      noData={Array.isArray(tournaments) && tournaments.length === 0}
      noDataText="No tournaments found."
      onRetryPress={onRetryPress}
      error={error}
    >
      {tournaments?.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={tournaments}
          renderItem={({ item }) => {
            return <TournamentRow item={item} />;
          }}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              // iOS only
              tintColor={theme.palette.text.primary}
              // Android only
              colors={[theme.palette.text.primary]}
            />
          }
        />
      ) : null}
    </ScreenContainer>
  );
};

export default Tournaments;
