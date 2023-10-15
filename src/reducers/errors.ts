type ErrorsState = {};

const initialState = {};

export default function errors(state: ErrorsState = initialState, action) {
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(action.type);

  // Not a *_REQUEST / *_FAILURE action, so ignore
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  // If *_FAILURE action - update reducer with error
  // If *_REQUEST reset to empty string
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? action.payload.error : '',
  };
}
