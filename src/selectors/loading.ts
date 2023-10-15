import get from 'lodash.get';
import { RootState } from '../store';

export const createLoadingSelector =
  (actions: string[]) => (state: RootState) => {
    return actions.some((action) => get(state, `loading.${action}`));
  };
