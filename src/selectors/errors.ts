import { Action } from 'redux';

import _ from 'lodash';
import get from 'lodash.get';
import { RootState } from '../store';

export const errorSelector = (actions: Array<string>) => (state: RootState) => {
  return (
    _(actions)
      .map((action: Action) => get(state, `errors.${action}`))
      .compact()
      .first() || ''
  );
};
