export default function movieReducer(state = false, action) {
  switch (action.type) {
    case "CHANGE_MODAL_VISIBILITY":
      return !state;
    default:
      return state;
  }
}
