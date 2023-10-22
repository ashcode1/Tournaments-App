import React from 'react';
import {
  Award,
  Calendar,
  Monitor,
  Plus,
  RefreshCcw,
  Search,
  User,
  Users,
  X,
} from 'react-native-feather';
import theme from '../theme';

const { sm, md, lg } = theme.icons.size;
const { text } = theme.palette;

export const AwardIcon = () => {
  return <Award stroke={text.primary} width={lg} height={lg} />;
};

export const CalendarIcon = () => {
  return <Calendar stroke={text.primary} width={sm} height={sm} />;
};

export const MonitorIcon = () => {
  return <Monitor stroke={text.primary} width={sm} height={sm} />;
};

export const SearchIcon = () => {
  return <Search stroke={text.primary} width={md} height={md} />;
};

export const PlusIcon = () => {
  return <Plus stroke={text.primary} width={md} height={md} />;
};

export const RefreshCcwIcon = () => {
  return <RefreshCcw stroke={text.primary} width={md} height={md} />;
};

export const UserIcon = () => {
  return <User stroke={text.primary} width={sm} height={sm} />;
};

export const UsersIcon = () => {
  return <Users stroke={text.primary} width={sm} height={sm} />;
};

export const XIcon = () => {
  return <X stroke={text.primary} width={md} height={md} />;
};
