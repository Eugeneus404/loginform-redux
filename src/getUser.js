import { store } from "./store"

export const getUser = (data) => {
    const users = store.getState().user;
    
    return users.find(v => v.login === data.login && v.password === data.password)
}