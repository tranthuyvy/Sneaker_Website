class discount_user_controller {
    hello = (req, res) => {
        return res.send("Hello from discount ")
    }
}

export default new discount_user_controller();