/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { RefreshControl, useWindowDimensions } from 'react-native';

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
import SearchBar from '../components/SearchBar';
import EditPrompt from '../components/EditPrompt';
import DeletePrompt from '../components/DeletePrompt';
import CreatePrompt from '../components/CreatePrompt';
import TournamentRow from '../components/TournamentRow';
import { Tournament } from '../reducers/tournaments';
import { ScreenName } from '../types/screenTypes/ScreenName';
import { calcNumOfColumns } from '../helpers/layoutHelpers';

export interface TournamentsProps {
  navigation: {
    navigate: (screen: string, params: { tournament: Tournament }) => void;
  };
}

const Tournaments: React.FC<TournamentsProps> = ({
  navigation,
}): JSX.Element => {
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] =
    React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const [numColumns, setNumColumns] = React.useState(1);

  const appDispatch = useAppDispatch();

  const page = useAppSelector(tournamentsPageSelector);
  const modalItem = useSelector(modalItemSelector);
  const tournaments = useAppSelector(tournamentsSelector);
  const moreToFetch = useAppSelector(moreTournamentsToFetchSelector);
  const deleteItem = useAppSelector(deleteItemSelector);
  const error = useAppSelector(errorSelector([GET_TOURNAMENTS]));
  const isLoading = useAppSelector(
    createLoadingSelector([
      GET_TOURNAMENTS,
      // CREATE_TOURNAMENT
    ])
  );

  // Prompt methods
  const onCancel = () => appDispatch(undoEdit(modalItem.id));
  const onDelete = () => appDispatch(deleteTournament(modalItem.id));
  const onCreate = (name: string) => appDispatch(createTournament(name));
  const onSave = (value: string) =>
    appDispatch(editTournament(modalItem.id, value));

  // Toggle
  const showModal = () => setModalVisible(true);
  const showDeleteModal = () => setDeleteModalVisible(true);
  const showCreateModal = () => setCreateModalVisible(true);

  // Navigate
  const onTournamentPress = (tournament: Tournament) => {
    navigation.navigate(ScreenName.TournamentDetails, { tournament });
  };

  // FAB methods
  const onFabCreatePress = () => showCreateModal();
  const onFabRefreshPress = () => appDispatch(undoDelete());

  // Search
  const onSearchBarChangeText = (val: string) => {
    setSearchValue(val);
    appDispatch(getTournaments(1, limit, val));
  };

  // Fetch & paginate
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

  React.useEffect(() => {
    setNumColumns(calcNumOfColumns(width));
  }, [width]);

  return (
    <ScreenContainer
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
        </>
      }
      fabConfig={{
        onCreatePress: onFabCreatePress,
        onRefreshPress: onFabRefreshPress,
        refreshVisible: deleteItem.id !== '',
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
          <Animated.FlatList
            data={tournaments}
            numColumns={numColumns}
            itemLayoutAnimation={Layout.springify()}
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  key={item.id}
                  entering={FadeIn.delay(index * 100)}
                >
                  <TournamentRow
                    item={item}
                    showModal={showModal}
                    showDeleteModal={showDeleteModal}
                    onTournamentPress={onTournamentPress}
                  />
                </Animated.View>
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
