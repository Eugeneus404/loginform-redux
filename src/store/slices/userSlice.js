const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser (state, action) {
            state.users.push({
                login: action.payload.login,
                password: action.payload.password,
                id: state.users.length + 1,
            })
        }
    }
})

export const {createUser} = userSlice.actions;

export default userSlice.reducer