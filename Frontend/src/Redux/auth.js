function authReducer(state = false, action) {
    switch (action.type) {
        case "LOGIN":
            return true
        case "INIT_AUTH":
            return localStorage.hasOwnProperty("accessToken")
        default:
            return state;
    }
}
function modalLoginReducer(state = false, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return true
        case "CLOSE_MODAL":
            return false
        default:
            return state;
    }
}

export { authReducer, modalLoginReducer }