
import React from 'react'
import {
    fetchStart,
    fetchFail,
    fetchApplyData,
    fetchTesekkurData,
    fetchOneriTalepData,
    fetchSikayetData,
    fetchFeedBackData,

} from '../features/feedbackSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toastInfoNotify, toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
// import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref as dbRef, uploadBytes, getDownloadURL, getMetadata, listAll, list, deleteObject } from "firebase/storage";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import package_json from "../../package.json"


const useFeedbackCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    function formatDate(dateStr) {
        const parts = dateStr.split(' ')[0].split('-')
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }

    //! firebase data gönder
    const postFireData2 = async (address, info) => {

        dispatch(fetchStart())

        try {

            const uID = uid()
            const db = getDatabase();


            // Eğer konu 'Etiklik' ve document var ise Firestore'a da ekle
            if (info?.topic === "Etiklik" && info?.document) {

                const store = getStorage() //storage bilgisini çek

                const filePath = `images/${info?.document?.name}`;
                const fileRef = dbRef(store, filePath);

                // Dosyayı Firebase Storage'a yükleyin
                await uploadBytes(fileRef, info?.document);

                // Yüklenen dosyanın URL'sini alın
                const downloadURL = await getDownloadURL(fileRef);

                if (downloadURL) {

                    // info objesini ayıkla ve downloadURL bilgisini yeni obje bilgisi içerisine ekle
                    const newData = { ...info, imgUrl: downloadURL }

                    //! realtime db kaydı için fonksiyon çalıştır
                    set(ref(db, `${address}/` + uID), newData);

                }
                else {
                    toastWarnNotify('Beklenmeyen bir hata oluştu. Tekrar deneyiniz.')
                }
            }
            else {

                set(ref(db, `${address}/` + uID), info);
            }


            toastSuccessNotify('Talebiniz alınmıştır teşekkür ederiz.')
            navigate('/')

            await sendMail(info)

        } catch (error) {
            console.log("error:  ", error)
            toastErrorNotify('❌ İşem başarısız, lütfen tekrar deneyiniz.')
        }

    }


    const postFireData = async (address, info) => {
        dispatch(fetchStart());

        try {
            const uID = uid();
            const db = getDatabase();

            let newData = { ...info };

            if (info?.topic === "Etiklik" && info?.document) {
                const store = getStorage();
                console.log("storatge : ", store)
                const filePath = `images/${uID}_${info.document.name}`;
                const fileRef = dbRef(store, filePath);

                // Yükleme ve URL alma
                await uploadBytes(fileRef, info.document);
                const downloadURL = await getDownloadURL(fileRef);

                newData.imgUrl = downloadURL;
            }

            // Realtime Database'e kayıt
            await set(ref(db, `${address}/` + uID), newData);

            toastSuccessNotify('Talebiniz alınmıştır, teşekkür ederiz.');
            navigate('/');

            // Mail gönderimi
            await sendMail(newData);

        } catch (error) {
            console.log("error:", error);
            toastErrorNotify('❌ İşlem başarısız, lütfen tekrar deneyiniz.');
        }
    }


    const getFireData = async (address, dateFrom, dateTo) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                if (data == null || data == undefined) {

                    dispatch(fetchFeedBackData({}))
                }
                else {

                    //db den gelen datayı array olarak çevir
                    const dizi = Object.keys(data).map(key => { return { id: key, ...data[key] } })

                    if (dateFrom && dateTo) {

                        const result = dizi.filter((item) => {
                            return formatDate(item.datetime) >= dateFrom && formatDate(item.datetime) <= dateTo
                        })

                        dispatch(fetchFeedBackData(result))
                    }
                    else {
                        dispatch(fetchFeedBackData(data))
                    }

                }


            });

        } catch (error) {
            toastErrorNotify('No Get Data')
        }



    }


    const putFireData = async (address, info) => {


        try {

            const db = getDatabase()
            await update(ref(db, `${address}/${info.id}`), info)
            toastSuccessNotify('Updated Data')

        } catch (error) {
            console.log("putFireData_Sikayet :", error)
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


    const sendMail = async (info) => {

        let address = ""
        if (info.topic === 'Etiklik') {
            address = 'etik@bonna.com.tr'
        }

        try {

            const data = JSON.stringify({
                "to": address ? address : `${process.env.REACT_APP_MAIL_TO_ADDRESS}`,
                "subject": `${package_json?.name} Bilgilendirme`,
                "message": info?.detail,
                "digitalplatform": package_json?.name || "Bonna Feedback",
            })

            const option = {
                method: "post",
                url: `${process.env.REACT_APP_MAIL_ENDPOINT}/api/sendmail`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }

            const res = await axios(option)

            if (res.status === 200) {
                console.log(" 📨 mail bilgilendirme yapılmıştır. 📨")
            }
            else {
                console.log(" ❌ mail gönderilemedi. ❌")
            }

        }
        catch (error) {
            console.log("sendMail Error: ", error)
        }
    }

    return {

        getFireData,
        postFireData,
        // getFireData_Tesekkur,
        removeFirebaseData,
        // getFireData_OneriTalep,
        // getFireData_Sikayet,
        putFireData

    }

}

export default useFeedbackCall




















