import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const urlLogin = {
    login: process.env.REACT_APP_LOGIN
}

const LOGIN = "user/LOGIN"
const LOGOUT = "user/LOGOUT"

export function UserLogIn (user){
    console.log("UserLogIn");
    return {type: LOGIN, user}
}

export function UserLogOut (user){
    console.log("LOGOUT");
    return {type: LOGOUT, user}
}



const initialState = {
    success : null
}


export const __loginDB  = createAsyncThunk(
    "user/__logoinDB",
    async(data ,thunkAPI) =>{
        try{
            const response = await axios.post(urlLogin.login, data);
            if(response.data.success === false){
                window.alert(response.data.error.message)
                return thunkAPI.rejectWithValue();
            }else{
                localStorage.setItem('authorization', response.headers.authorization);
                localStorage.setItem('refreshToken', response.headers.refreshtoken);
                localStorage.setItem('nickname', response.data.data.nickname);
                localStorage.setItem('isLogin', true);
                return thunkAPI.fulfillWithValue(response.data)
            }
        }
        catch(error){
            window.alert(data.data.error.message)
            return thunkAPI.rejectWithValue(error);
        }
    }
)


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {},
    extraReducers:{
        [__loginDB.fulfilled]: (state, action) => {
            state.success = action.payload;
            state.isLogin = true
        },
        [__loginDB.rejected]: (state, action) => {
            state.isLogin = false;
            state.error = action.payload;
          }
    }

})

export default userSlice.reducer;