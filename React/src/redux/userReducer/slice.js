import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
}

const userSlice = createSlice({
    name: 'user', //nome do reducer  
    initialState,
    reducers: { // no slice, as actions do reducer ficam aqui mesmo
        loginUser: (state, action) => {  
            state.currentUser = action.payload
            },
        logoutUser: (state) => {
            state.currentUser = null
            localStorage.removeItem('currentUser')
            }
        }
    })

export const { loginUser, logoutUser }  = userSlice.actions //o slice que criamos contém um atributo actions, que contém as actions que criamos
export default userSlice.reducer // o reducer do slice que criamos para podermos salvo-lo no root-reducer