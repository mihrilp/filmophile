export default function movieDetailReducer(state = {}, action) {
    switch (action.type) {
        case "FETCH_MOVIE_DETAIL":
            return state = action.payload;
        default:
            return state;
    }
}