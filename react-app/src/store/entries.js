const CREATE_NEW_JOURNAL = 'entries/createNewJournal';

const loadJournalEntry = (entry) => ({
  type: CREATE_NEW_JOURNAL,
  payload: entry
}); 

export const createJournalEntry = (entry) => async (dispatch) => {
  const res = await fetch("/api/journal/new", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(entry)
  });
  const data = await res.json();
  if(!res.errors) {
    dispatch(loadJournalEntry(data));
  }

}

const initialState = { journals: null }

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CREATE_NEW_JOURNAL:
      newState = Object.assign({}, state, { journals: action.payload });
      return newState;
    default:
      return state;
  }
}

export default reducer;