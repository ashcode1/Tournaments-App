/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, FlatList, RefreshControl } from 'react-native';

import theme from '../theme';
import TournamentRow from '../components/TournamentRow';
import ScreenContainer from './ScreenContainer';
import { errorSelector } from '../selectors/errors';
import { createLoadingSelector } from '../selectors/loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  GET_TOURNAMENTS,
  editTournament,
  getTournaments,
  undoEdit,
} from '../actions/tournaments';
import {
  modalItemSelector,
  moreTournamentsToFetchSelector,
  tournamentsPageSelector,
  tournamentsSelector,
} from '../selectors/tournaments';
import Prompt from '../components/Prompt';

const Tournaments: React.FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const appDispatch = useAppDispatch();

  const page = useAppSelector(tournamentsPageSelector);
  const modalItem = useSelector(modalItemSelector);
  const tournaments = useAppSelector(tournamentsSelector);
  const moreToFetch = useAppSelector(moreTournamentsToFetchSelector);
  const isLoading = useAppSelector(createLoadingSelector([GET_TOURNAMENTS]));
  const error = useAppSelector(errorSelector([GET_TOURNAMENTS]));

  const onCancel = () => appDispatch(undoEdit(modalItem.id));
  const onSave = (value: string) =>
    appDispatch(editTournament(modalItem.id, value));

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
      <>
        <Prompt
          visible={modalVisible}
          setVisible={setModalVisible}
          defaultValue={modalItem.name}
          onSave={onSave}
          onCancel={onCancel}
        />
        {tournaments?.length > 0 ? (
          <FlatList
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item.id.toString()}
            data={tournaments}
            renderItem={({ item }) => {
              return (
                <TournamentRow
                  item={item}
                  // setModalItem={setModalItem}
                  // showModal={show}
                  showModal={() => setModalVisible(true)}
                  // modalItem={modalItem}
                  // showModal={handleShowModal}
                />
              );
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
      </>
    </ScreenContainer>
  );
};

export default Tournaments;
