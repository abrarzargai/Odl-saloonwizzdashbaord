import {
    addData,
    getAuthStart,
    getAuthError,
    removeUser
} from '../Reducer/AuthReducer'
import axios from 'axios';




// Sign  Up
export const SignMeUp = (data) => async (dispatch) => {
     dispatch(getAuthStart())
     try {
        //const { data?.userDetails } = await getProducts();

         await axios.post('https://odl-saloonwizz-app.herokuapp.com/api/user/signup', data?.userDetails)
            .then(function (response) {
                console.log("got respnse in posted : ", response);
                dispatch(addData())
            })
            .catch(function (error) {
                console.log("Sorry error : ", error);
                dispatch(getAuthError({message : "User Already Exists"}))
            });

        //dispatch(addData(data?.allProducts))
    } catch (error) {
        dispatch(getAuthError())
    }
}


// Sign in 
export const SignMeIn = (myData) => async (dispatch) => {
     dispatch(getAuthStart())
     console.log("gong to call")
     try {
        //const { data?.userDetails } = await getProducts();

         const {data} = await axios.post('https://odl-saloonwizz-app.herokuapp.com/api/user/login', myData?.userDetails)
            .then(function (response) {
                console.log("got respnse in posted in sign in : ", response);
                localStorage.setItem("profile", JSON.stringify(response?.data?.User[0]));
                dispatch(addData())
            })
            .catch(function (error) {
                console.log("Sorry error : ", error);
                dispatch(getAuthError({message : "User Data is Invalid"}))
            });

            console.log("got data :", )

        //dispatch(addData(data?.allProducts))
    } catch (error) {
        dispatch(getAuthError())
    }
}


// Sign out
export const SignMeOut = () => async (dispatch) => {
    dispatch(getAuthStart())
    console.log("gong to call")
    try {
        dispatch(removeUser())
    } catch (error) {
        dispatch(getAuthError())
    }
}