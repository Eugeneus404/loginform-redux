export const changeLocalStorage = (action, data) => {
    let key = "user_imitation_token"
    let user = localStorage.getItem(key)
    let result = false;

    if (action === 'delete') {
        if (user) {
            localStorage.removeItem(key)
            result = true
        }
    } else if (action === "create"){
        localStorage.setItem(key, JSON.stringify(data))
        result = true
    }

    return result
}