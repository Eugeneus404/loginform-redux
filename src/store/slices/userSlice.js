const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser (state, action) {
            state.push({
                login: action.payload.login,
                password: action.payload.password,
                id: state.length + 1,
            })
        }
    }
})

export const {createUser} = userSlice.actions;

export default userSlice.reducer