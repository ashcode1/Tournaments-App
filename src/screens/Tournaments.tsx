/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';

import theme from '../theme';
import ScreenContainer from './ScreenContainer';
import { errorSelector } from '../selectors/errors';
import { createLoadingSelector } from '../selectors/loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  // CREATE_TOURNAMENT,
  GET_TOURNAMENTS,
  createTournament,
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
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import EditPrompt from '../components/EditPrompt';
import DeletePrompt from '../components/DeletePrompt';
import CreatePrompt from '../components/CreatePrompt';
import TournamentRow from '../components/TournamentRow';

const Tournaments: React.FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] =
    React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const appDispatch = useAppDispatch();

  const page = useAppSelector(tournamentsPageSelector);
  const modalItem = useSelector(modalItemSelector);
  const tournaments = useAppSelector(tournamentsSelector);
  const moreToFetch = useAppSelector(moreTournamentsToFetchSelector);
  const isLoading = useAppSelector(
    createLoadingSelector([
      GET_TOURNAMENTS,
      // CREATE_TOURNAMENT
    ])
  );
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

  const onCreate = (name: string) => appDispatch(createTournament(name));

  const showModal = () => setModalVisible(true);
  const showDeleteModal = () => setDeleteModalVisible(true);

  const onSearchBarChangeText = (val: string) => {
    fetchInitial();
    setSearchValue(val);
  };

  const limit = 10;

  const fetchInitial = () => appDispatch(getTournaments(1, limit, searchValue));

  const onEndReached = () => {
    if (!isLoading && moreToFetch) {
      appDispatch(getTournaments(page, limit, searchValue));
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
    if (isRefreshing === true && isLoading === false) {
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
      noDataText={{
        title: 'No tournaments found!',
        body: 'Try typing at least 3 letters.',
      }}
      onRetryPress={onRetryPress}
      error={error}
      headerContent={
        <>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeText={onSearchBarChangeText}
          />
          {deleteItem.id !== '' ? (
            <Button onPress={onUndoDelete}>UNDO DELETE</Button>
          ) : null}
        </>
      }
      fabConfig={{
        onPress: () => {
          setCreateModalVisible(true);
        },
      }}
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
        <CreatePrompt
          visible={createModalVisible}
          setVisible={setCreateModalVisible}
          defaultValue=""
          onCreate={onCreate}
          onCancel={onCancel}
        />
        {tournaments?.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index + item.id}
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
                refreshing={isRefreshing && isLoading}
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
