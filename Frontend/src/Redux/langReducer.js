import common_vi from "../Lang/vi.json"
import common_en from "../Lang/en.json";
function langReducer(state = common_vi, action) {
    switch (action.type) {
        case "LANG_ENG":
          return common_en;
        case "LANG_VI":
          return common_vi;
        default:
          return state;
      }
}
export default langReducer