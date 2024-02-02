
import React from 'react'
import {
    fetchStart,
    fetchFail,
    fetchApplyData,
    fetchTesekkurData,
    fetchOneriTalepData,
    fetchSikayetData,

} from '../features/feedbackSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toastInfoNotify, toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"


const useFeedbackCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    //! firebase data gönder
    const postFireData = async (address, info) => {

        dispatch(fetchStart())

        try {

            const uID = uid()
            const db = getDatabase();
            set(ref(db, `${address}/` + uID), info);
            toastSuccessNotify('Talebiniz alınmıştır teşekkür ederiz.')
            navigate('/')

        } catch (error) {
            toastErrorNotify('❌ İşem başarısız, lütfen tekrar deneyiniz.')
        }

    }



    //! firebase data çek
    const getFireData_Tesekkur = async (address) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                // console.log(data)

                if (data == null || data == undefined) {
                    console.log("firebase data null geliyor:", data)
                }
                else {
                    dispatch(fetchTesekkurData(data))
                }


            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }



    }



    const getFireData_OneriTalep = async (address) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                // console.log(data)

                if (data == null || data == undefined) {
                    console.log("firebase data null geliyor:", data)
                }
                else {
                    dispatch(fetchOneriTalepData(data))
                }


            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }



    }



    const getFireData_Sikayet = async (address) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                // console.log(data)

                if (data == null || data == undefined) {
                    console.log("firebase data null geliyor:", data)
                }
                else {
                    dispatch(fetchSikayetData(data))
                }


            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }



    }


    
    //! firebase data silme
    const removeFirebaseData = async (address, id) => {

        try {
            const db = getDatabase();
            remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted ✅')
        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }


    return {

        postFireData,
        getFireData_Tesekkur,
        removeFirebaseData,
        getFireData_OneriTalep,
        getFireData_Sikayet

    }

}

export default useFeedbackCall




















