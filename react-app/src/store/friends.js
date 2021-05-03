const LOAD_SEARCH_RESULTS = 'friends/loadSearchResults';
const CLEAR_SEARCH_RESULTS = 'friends/clearSearchResults';

const loadSearchResults = (friends) => ({
    type: LOAD_SEARCH_RESULTS,
    payload: friends
});

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const searchForFriends = (query) => async (dispatch) => {
  const res = await fetch(`/api/friends/search/${query}`);
  const data = await res.json();
  dispatch(loadSearchResults(data["results"]));
};

const initialState = { search: [] };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      newState = Object.assign({}, state, { search: action.payload });
      return newState;
    case CLEAR_SEARCH_RESULTS:
      newState = Object.assign({}, state, { search: [] });
      return newState;
    default:
      return state;
  }
};

export default reducer;