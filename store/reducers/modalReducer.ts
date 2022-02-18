const initialState = false;
interface ModalAction {
  type: string;
  payload: boolean;
}

export default function modalReducer(
  state: boolean = initialState,
  action: ModalAction
) {
  switch (action.type) {
    case "CHANGE_MODAL_VISIBILITY":
      return !state;
    default:
      return state;
  }
}
