class GenericUserAuth {
    
    #authorization

    constructor (user) {
        this.user = user
        this.#authorization = false
    }

    set auth(status) {
        this.#authorization = status
    }

    get isAuth() {
        return this.#authorization
    }
}

module.exports = GenericUserAuth