
function searchReducer(state = '', action) {
  switch (action.type) {
    case "SEARCH":
      return action.data;
    default:
      return state;
  }
}
export default searchReducer