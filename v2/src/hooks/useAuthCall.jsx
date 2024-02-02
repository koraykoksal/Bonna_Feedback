import axios from "axios";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess, fetchLoginData } from "../features/authSlice";
import { toastInfoNotify, toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { auth } from "../auth/firebase";


const useAuthCall = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const login = async (userdata) => {

    
        dispatch(fetchStart())

        try {
            //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
            let userCredential = await signInWithEmailAndPassword(
                auth,
                userdata.email,
                userdata.password
            );

            dispatch(loginSuccess(userCredential?.user))
            navigate("/");
            toastSuccessNotify("Logged in successfully!");

        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const logout = async () => {


        signOut(auth);
        dispatch(logoutSuccess())
        navigate("/");
        toastSuccessNotify("Logged out successfully!");
    }




    return {
        login,
        logout
    }
}



export default useAuthCall