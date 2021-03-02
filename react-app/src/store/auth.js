const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_FRIEND = 'session/addFriend';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const loadFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = ({ email, password }) => async (dispatch) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(setUser(data));
  }
  return res;
};

export const addFriend = (friend) => async (dispatch) => {
  const res = await fetch(`api/friends/${friend.id}/add`);
  const data = await res.json();
  if (!data.errors) {
    dispatch(loadFriend(friend))
  }
}

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/auth', {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()
  if (!data.errors){
    dispatch(setUser(data));
  }
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password
    })
  });
  if (res.ok){
    const data = await res.json()
    dispatch(setUser(data));
  }
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/auth/logout', {
    method: 'GET',
  });
  if (res.ok){
    dispatch(removeUser());
  }
  return res;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    case ADD_FRIEND:
      newState = Object.assign({}, state);
      newState.user.friends = {...newState.user.friends, [action.payload.id]: action.payload}
      return newState;
    default:
      return state;
  }
};

export default reducer;