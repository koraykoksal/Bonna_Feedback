
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createElement, useEffect } from "react";
import moment from "moment";


const initialState = {
    loading:false,
    error:false,
    tesekkurData:[],
    oneriTalepData:[],
    sikayetData:[],
    feedbackData:[]

}

const feedbackSlice = createSlice({

    name: "feedback",
    initialState,
    reducers: {


        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        fetchTesekkurData:(state,{payload})=>{
            state.loading=false
            state.tesekkurData=payload
        },
        fetchOneriTalepData:(state,{payload})=>{
            state.loading=false
            state.oneriTalepData=payload
        },
        fetchSikayetData:(state,{payload})=>{
            state.loading=false
            state.sikayetData=payload
        },
        fetchFeedBackData:(state,{payload})=>{
            state.loading=false
            state.feedbackData=payload
        },
        fetchEnd:(state)=>{
            state.loading=false
        }



    }


})



export const {
    
    fetchStart,
    fetchEnd,
    fetchFail,
    fetchTesekkurData,
    fetchOneriTalepData,
    fetchSikayetData,
    fetchFeedBackData

} = feedbackSlice.actions

//slice oluşturulduktan sonra export default olarak export edilmeli ve reducer ifadesi belirtilmelidir.
export default feedbackSlice.reducer






