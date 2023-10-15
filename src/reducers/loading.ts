type LoadingState = {};

const initialState = {};

const loadingReducer = (state: LoadingState = initialState, action) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);

  /*
  Store whether a request is happening at the moment or not
  e.g. will be true when receiving *_REQUEST
  and false when receiving *_SUCCESS / *_FAILURE
  */

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};

export default loadingReducer;
