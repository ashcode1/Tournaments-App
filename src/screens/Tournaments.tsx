/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';

import theme from '../theme';
import TournamentRow from '../components/TournamentRow';
import ScreenContainer from './ScreenContainer';
import { errorSelector } from '../selectors/errors';
import { createLoadingSelector } from '../selectors/loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  GET_TOURNAMENTS,
  deleteTournament,
  editTournament,
  getTournaments,
  undoDelete,
  undoEdit,
} from '../actions/tournaments';
import {
  deleteItemSelector,
  modalItemSelector,
  moreTournamentsToFetchSelector,
  tournamentsPageSelector,
  tournamentsSelector,
} from '../selectors/tournaments';
import EditPrompt from '../components/EditPrompt';
import DeletePrompt from '../components/DeletePrompt';
import Button from '../components/Button';

const Tournaments: React.FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);

  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const appDispatch = useAppDispatch();

  const page = useAppSelector(tournamentsPageSelector);
  const modalItem = useSelector(modalItemSelector);
  const tournaments = useAppSelector(tournamentsSelector);
  const moreToFetch = useAppSelector(moreTournamentsToFetchSelector);
  const isLoading = useAppSelector(createLoadingSelector([GET_TOURNAMENTS]));
  const error = useAppSelector(errorSelector([GET_TOURNAMENTS]));
  const deleteItem = useAppSelector(deleteItemSelector);

  const onCancel = () => appDispatch(undoEdit(modalItem.id));

  const onDelete = () => {
    appDispatch(deleteTournament(modalItem.id));
  };

  const onUndoDelete = () => {
    appDispatch(undoDelete());
  };

  const onSave = (value: string) =>
    appDispatch(editTournament(modalItem.id, value));

  const showModal = () => setModalVisible(true);
  const showDeleteModal = () => setDeleteModalVisible(true);

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
      headerContent={
        deleteItem.id !== '' ? (
          <Button onPress={onUndoDelete}>UNDO DELETE</Button>
        ) : null
      }
    >
      <>
        <EditPrompt
          visible={modalVisible}
          setVisible={setModalVisible}
          defaultValue={modalItem.name}
          onSave={onSave}
          onCancel={onCancel}
        />
        <DeletePrompt
          visible={deleteModalVisible}
          setVisible={setDeleteModalVisible}
          onDelete={onDelete}
          onCancel={onCancel}
        />
        {tournaments?.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={tournaments}
            renderItem={({ item }) => {
              return (
                <TournamentRow
                  item={item}
                  showModal={showModal}
                  showDeleteModal={showDeleteModal}
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
