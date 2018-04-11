import 'babel-polyfill'
import {combineReducers } from "redux";
export const GET_POLLS = 'GET_POLLS'

export function getPolls(json) {
    return {
        type:GET_POLLS,
        polls:json 
    }
}

export const ADD_POLL = 'ADD_POLL'

export function addPoll() {
    return {
        type: ADD_POLL
    }
}

export const REQUEST_DATA ='REQUEST_DATA'

export function requestData() {
    return{
    type:REQUEST_DATA,
    }
}

export const ADD_SWITCH ='ADD_SWITCH'

export function addSwitch() {
    return{
    type:ADD_SWITCH
    }
}

export const EXTEND_SWITCH ='EXTEND_SWITCH'

export function extendSwitch() {
    return{
    type:EXTEND_SWITCH
    }
}

export const LOG_IP ='LOG_IP'

export function logIp(ip) {
    return{
    type:LOG_IP,
    ip:ip
    }
}

export function fetchPolls() {
    return async (dispatch)=>{
        dispatch(requestData())
        var req = new Request("polls",{method:"GET"})
        try {
            var data = await fetch(req)
            data=await data.json()
            dispatch(getPolls(data))
        } catch (error){
            if (error) throw error
        }
    }
}

export function deletePoll(id) {
    return async (dispatch)=>{
        var req = new Request("del",{method:"DELETE",body:id})
        try {
            var data = await fetch(req)
            data=await data.json()
            dispatch(getPolls(data))
        } catch (error){
            if (error) throw error
        }
    }
}

export function updatePoll(obj) {

    return async (dispatch)=>{
       
        var data = Object.assign({},obj)
        console.log("sending ",data," to db")
        var req = new Request("update",{method:"POST",body:JSON.stringify(data)})

        try {
            var polls = await fetch(req)
            polls=await polls.json()
            
            if (typeof(polls)=='string'){
                alert(polls)
            }else {
                console.log(dispatch)
                dispatch(getPolls(polls))
                }
        } catch (error){
            if (error) throw error
        }
    }
}

export function newPoll(body) {
    return async (dispatch)=>{
        dispatch(addSwitch())
        var req = new Request("add",{method:"POST",body:JSON.stringify(body)})
        try {
            var data = await fetch(req)
            data=await data.json()
            dispatch(getPolls(data))
        } catch (error){
            if (error) throw error
        }
        }
}

export function fetchIp() {

    return async (dispatch)=>{
        var ip = new Request("http://api.ipstack.com/check?access_key="+process.env.API_KEY,{method:"GET"})
            
        try {
            var data=await fetch(ip)
            data=await data.json()
            dispatch(logIp(data['ip']))
        } catch (error){
            if (error) throw error
        }
    }        
}