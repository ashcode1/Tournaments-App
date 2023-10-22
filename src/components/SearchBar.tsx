import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View } from 'react-native';

import { SearchIcon, XIcon } from '../icons';
import Input from './Input';
import theme from '../theme';

const StyledView = styled.View`
  background-color: ${theme.palette.background.base};
  justify-content: center;
  align-items: center;
`;

const StyledTouchableOp = styled.TouchableOpacity`
  background-color: ${theme.palette.background.base};
  justify-content: center;
  align-items: center;
`;

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (str: string) => void;
  onChangeText: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
  onChangeText,
}): JSX.Element => {
  const onXPress = () => {
    setSearchValue('');
  };

  return (
    <View style={styles.container}>
      <StyledView>
        <SearchIcon />
      </StyledView>
      <Input
        style={styles.input}
        placeholder="Seach tournaments..."
        onChangeText={onChangeText}
        defaultValue={searchValue}
        placeholderTextColor={theme.palette.text.primary}
      />
      {searchValue !== '' ? (
        <StyledTouchableOp onPress={onXPress}>
          <XIcon />
        </StyledTouchableOp>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingHorizontal: 16 },
  input: { flex: 1 },
});

export default SearchBar;
