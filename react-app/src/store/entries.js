const CREATE_NEW_JOURNAL = 'entries/createNewJournal';
const LOAD_CURRENT_JOURNAL = 'entries/loadCurrentJournal'
const EDIT_CURRENT_JOURNAL = 'entries/editCurrentJournal'
const LOAD_ALL_JOURNAL_ENTRIES = 'entries/loadAllJournalEntries'
const LOAD_JOURNAL_ENTRIES_LIST = 'entries/loadJournalEntriesList'

const loadJournalEntry = (entry) => ({
  type: CREATE_NEW_JOURNAL,
  payload: entry
});

const loadAllJournalEntries = (entries) => ({
  type: LOAD_ALL_JOURNAL_ENTRIES,
  payload: entries
});

const loadJournalEntriesList = (entries) => ({
  type: LOAD_JOURNAL_ENTRIES_LIST,
  payload: entries
});

const loadCurrentJournal = (entry) => ({
  type: LOAD_CURRENT_JOURNAL,
  payload: entry
});

const loadEditJournal = (entry) => ({
  type: EDIT_CURRENT_JOURNAL,
  payload: entry
});


export const createJournalEntry = (entry, photo) => async (dispatch) => {
  if (photo) {
    const form = new FormData();
    form.append("title", entry.title)
    form.append("body", entry.body)
    form.append("image", photo)
    const res = await fetch("/api/journal/new", {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    if (!res.errors) {
      dispatch(loadJournalEntry(data));
    }
  } else {
    const res = await fetch("/api/journal/new", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    if (!res.errors) {
      dispatch(loadJournalEntry(data));
    }
  }
 
};

export const editJournalEntry = (entry, photo) => async (dispatch) => {
  if (photo) {
    const form = new FormData();
    form.append("title", entry.title)
    form.append("body", entry.body)
    form.append("image", photo)
    const res = await fetch(`/api/journal/${entry.id}/edit`, {
      method: 'PUT',
      body: form
    });
    const data = await res.json();
    if (!res.errors) {
      dispatch(loadEditJournal(data));
    }
  } else {
    const res = await fetch(`/api/journal/${entry.id}/edit`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    if (!res.errors) {
      dispatch(loadEditJournal(data));
    }
  }
};


export const fetchCurrentJournal = () => async (dispatch) => {
  const res = await fetch("/api/journal/current");
  const data = await res.json();
  if (!data.errors) {
    dispatch(loadCurrentJournal(data));
  }
};

export const fetchAllJournalEntries = () => async (dispatch) => {
  const res = await fetch("/api/journal/entries");
  const data = await res.json();
  if (!data.errors) {
    dispatch(loadAllJournalEntries(data["journal_entries"]));
  }
};

export const fetchJournalEntriesLimit = (page) => async (dispatch) => {
  const res = await fetch(`/api/journal/entries/${page}`);
  const data = await res.json();
  if (!data.errors) {
    dispatch(loadJournalEntriesList(data["journal_entries"]));
  }
};

const initialState = { journals: {all: {}, current: null} }

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CREATE_NEW_JOURNAL:
      newState = Object.assign({}, state);
      newState.journals.all = {...newState.journals.all, [action.payload.id]: action.payload};
      newState.journals.current = action.payload;
      return newState;
    case LOAD_CURRENT_JOURNAL:
      newState = Object.assign({}, state);
      newState.journals.current = action.payload;
      return newState;
    case LOAD_ALL_JOURNAL_ENTRIES:
      newState = Object.assign({}, state);
      newState.journals.all = action.payload;
      return newState;
    case LOAD_JOURNAL_ENTRIES_LIST:
      newState = Object.assign({}, state);
      newState.journals.list = {...newState.journals.list, ...action.payload};
      return newState;
    case EDIT_CURRENT_JOURNAL:
      newState = Object.assign({}, state);
      newState.journals.current = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;