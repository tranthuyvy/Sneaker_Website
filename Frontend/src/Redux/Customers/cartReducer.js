import { setCart } from "../../config/common";
import { getCart } from "../../config/common";
function cartReducer(state = getCart(), action) {
    switch (action.type) {
        case "SET_CART":
            setCart([...getCart(), action.data])
            return [...state, action.data];
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