const LOAD_INBOX = 'user/loadInbox';

const loadInbox = (messages) => ({
    type: LOAD_INBOX,
    payload: messages
});

export const fetchInbox = () => async (dispatch) => {
  const res = await fetch("/api/inbox/");
  const data = await res.json();
  dispatch(loadInbox(data["messages"]));
};

const initialState = { messages: []};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_INBOX:
      newState = Object.assign({}, state);
      newState.messages = action.payload;
      return newState;
    default:
      return state;
  }
}

export default reducer;