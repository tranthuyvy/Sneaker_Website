import { setCart } from "../../config/common";
import { getCart } from "../../config/common";
function cartReducer(state = getCart(), action) {
    switch (action.type) {
        case "SET_CART":
            // setCart([...action.data].reduce((acc, item) => {
            //     if (!acc.some((x) => x.id === item.id)) {
            //       acc.push(item);
            //     }
            //     return acc;
            //   }, []))
            // return [...state, ...action.data].reduce((acc, item) => {
            //     if (!acc.some((x) => x.id === item.id)) {
            //       acc.push(item);
            //     }
            //     return acc;
            //   }, []);
        return [...action.data]
        case "INIT_CART":
            return [...getCart()];
        case "DELETE_CART":
            localStorage.removeItem('cart')
            return []
        default:
            return state;
    }
}
export default cartReducer