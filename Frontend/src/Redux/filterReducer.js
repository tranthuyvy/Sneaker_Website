
function filterReducer(state = { minPrice: 0, maxPrice: 0, listSize: [] }, action) {
    switch (action.type) {
        case "FILTER":
            return { ...state, minPrice: action.data.minPrice, maxPrice: action.data.maxPrice, listSize: [...action.data.listSize] };
        default:
            return state;
    }
}
export default filterReducer