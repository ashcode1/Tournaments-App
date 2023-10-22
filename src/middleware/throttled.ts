/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThunkMiddleware } from 'redux-thunk';

const throttled: { [key: string]: boolean } = {};

const throttledMiddleware: ThunkMiddleware =
  ({ getState, appDispatch }: any) =>
  (next: any) =>
  (action: any) => {
    const time = action.meta && action.meta.throttle;
    if (!time) return next(action);
    if (throttled[action.type]) {
      return;
    }
    throttled[action.type] = true;
    setTimeout(() => {
      throttled[action.type] = false;
    }, time);
    next(action);
  };

export default throttledMiddleware;
