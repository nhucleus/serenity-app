// const LOAD_FRIENDS = 'user/loadFriends';

// const loadFriends = (friends) => ({
//     type: LOAD_FRIENDS,
//     payload: friends
// });

// export const fetchFriends = () => dispatch => {
//   const res = await fetch("/api/friends");
//   const data = await res.json();
//   dispatch(loadFriends(data["friends"]));
// };

const initialState = { messages: {}};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // case LOAD_FRIENDS:
    //   newState = Object.assign({}, state, { friends: action.payload });
    //   return newState;
    default:
      return state;
  }
}

export default reducer;