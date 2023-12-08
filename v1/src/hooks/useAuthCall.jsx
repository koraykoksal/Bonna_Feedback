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

    //* REGISTER
    // const signUp = async ({ email, password, displayName }) => {


    //     dispatch(fetchStart())

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {

    //             const user = userCredential.user;


    //             dispatch(registerSuccess(user))

    //             updateProfile(auth.currentUser, { displayName: displayName })

    //             navigate('/proses')
    //             toastSuccessNotify("Register Success ✅")
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             dispatch(fetchFail(error))
    //             toastErrorNotify(`${error.code} ❌`)
    //         });



    // }

    //* LOGIN
    // const signIn = async ({ email, password }) => {

    //     dispatch(fetchStart())

    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {

    //             const user = userCredential.user;

    //             dispatch(loginSuccess(user))

    //             navigate('/proses')
    //             toastSuccessNotify("Login Success ✅")
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             dispatch(fetchFail(error))
    //             toastErrorNotify(`${error.code} ❌`)
    //         });




    // }

    //* LOGOUT
    // const logout = async () => {


    //     dispatch(fetchStart())

    //     try {

    //         await signOut(auth)

    //         navigate('/')
    //         toastSuccessNotify("Logout Success ✅")

    //     } catch (error) {
    //         dispatch(fetchFail())
    //         toastErrorNotify('Register Fault ! ❌')
    //     }


    // }


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
            navigate("/userapplications");
            toastSuccessNotify("Logged in successfully!");
            // console.log(userCredential);

        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const logout = async () => {


        signOut(auth);
        dispatch(logoutSuccess())
        navigate("/login");
        toastSuccessNotify("Logged out successfully!");
    }




    return {
        // signUp, 
        // signIn, 
        login,
        logout
    }
}



export default useAuthCall