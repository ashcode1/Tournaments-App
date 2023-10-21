import React from 'react';
import { Plus, Search, X } from 'react-native-feather';
import theme from '../theme';

const { md } = theme.icons.size;
const { text } = theme.palette;

export const SearchIcon = () => {
  return <Search stroke={text.primary} width={md} height={md} />;
};

export const XIcon = () => {
  return <X stroke={text.primary} width={md} height={md} />;
};

export const PlusIcon = () => {
  return <Plus stroke={text.primary} width={md} height={md} />;
};
