
import React from 'react'
import {
    fetchStart,
    fetchFail,
    fetchApplyData,
    fetchTesekkurData,
    fetchOneriTalepData,
    fetchSikayetData,

} from '../features/raffleSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toastInfoNotify, toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { bonnaPersonels } from '../helper/personels'


const useRaffleCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const postFireData = async (address, info) => {

        dispatch(fetchStart())

        try {

            const uID = uid()
            const db = getDatabase();
            set(ref(db, `${address}/` + uID), info);
            toastSuccessNotify('✅ Talebiniz alınmıştır teşekkür ederiz.')
            navigate('/')

        } catch (error) {
            toastErrorNotify('❌ İşem başarısız, lütfen tekrar deneyiniz.')
        }

    }


    //! firebase data çek
    const getFireData = async (address) => {

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
                    dispatch(fetchActivityData(data))

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


    const get_bonnaPersonel = () => {

        dispatch(fetchStart())

        try {

            // const options = {
            //     method: 'GET',
            //     url: `${process.env.REACT_APP_bonnaUsers_BaseAddress}`,
            //     headers: {
            //         'APIKEY': `${process.env.REACT_APP_bonnaApiKey}`

            //     }
            // }

            // const res = await axios(options)
            // dispatch(fetchBonnaPersonelData(res?.data))

            const res = bonnaPersonels.map((item) => item)
            // console.log("personel tcno: ",res)
            dispatch(fetchBonnaPersonelData(res))

        } catch (error) {
            console.log("get_bonnaPersonel: ", error)
        }
    }

    const post_userWinners = (address, info) => {

        dispatch(fetchStart())

        try {

            const uID = uid()
            const db = getDatabase()

            set(ref(db, `${address}/` + uID), info)
            toastSuccessNotify('Data Added ✅')

        } catch (error) {
            console.log("post userWinners", error)
        }

    }

    const get_userWinners = (address) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                // console.log(data)

                if (data == null || data == undefined) {
                    console.log("activity user-winners data null geliyor:", data)
                }
                else {
                    dispatch(fetchUserWinnersData(data))

                }


            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }
    }


    return {

        postFireData,
        getFireData,
        removeFirebaseData,
        get_bonnaPersonel,
        post_userWinners,
        get_userWinners

    }

}

export default useRaffleCall




















