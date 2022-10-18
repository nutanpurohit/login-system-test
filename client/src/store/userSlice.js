import { createSlice } from '@reduxjs/toolkit'

const initialState = { email: '' }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
