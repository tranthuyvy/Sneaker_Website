
function productReducer(state = common_vi, action) {
    switch (action.type) {
        case "LANG_ENG":
          return common_en;
        case "LANG_VI":
          return common_vi;
        default:
          return state;
      }
}
export default productReducer