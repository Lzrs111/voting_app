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

export const LOG_IP ='LOG_IP'

export function logIp(ip) {
    return{
    type:LOG_IP,
    ip:ip
    }
}

export const USER_STATUS ='USER_STATUS'

export function userStatus(status,username) {
    return{
    type:USER_STATUS,
    userStatus: status,
    username:username 
    }
}

export const USER_POLLS ='USER_POLLS'

export function userPolls(polls) {
    return{
    type:USER_POLLS,
    userPolls: polls
    }
}

export const LOGIN_SWITCH ='LOGIN_SWITCH'

export function loginSwitch() {
    return{
    type:LOGIN_SWITCH
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

export function deletePoll(body) {
    return async (dispatch)=>{
        var req = new Request("del",{method:"DELETE",body:JSON.stringify(body)})
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
        var req = new Request("update",{method:"POST",body:JSON.stringify(data)})

        try {
            var res = await fetch(req)
            console.log(res,"res")
            data=await res.json()
            console.log(data,data)
            
            if (res.status == 200){
                dispatch(getPolls(data))
            } else {
                alert(data)
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
            console.log(body.username)
            dispatch(fetchUserPolls(body.username))
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

export function registerUser(body) {
    return async (dispatch) => {
        var req = new Request("register",{method:"POST",body:JSON.stringify(body)})

        try {
            var res = await fetch(req)
            console.log(res)
            res = await res.json()
            console.log(res,"registered")
            dispatch(userStatus(res,""))
        } catch (error) {
            if (error) throw error
        }
    }
}

export function loginUser(body) {
    return async(dispatch)=>{
        var req = new Request("login",{method:"POST",body:JSON.stringify(body)})

        try {
            var res = await fetch(req)
            console.log(res)
            var data = await res.json()
            if (res.status == 200){
                console.log("Ok")
                 dispatch(userStatus("logged in",body.username))
                 dispatch(loginSwitch())
                 dispatch(userPolls(data.userPolls))
            } else {
                console.log(data)
                dispatch(userStatus(data,""))
            }
        } catch (error) {
            console.log(error,error)
        }

        }
}

export function fetchUserPolls(username) {
    return async(dispatch)=>{
        try {
            var req = new Request("userpolls",{method:"POST",body:username})
            var polls = await fetch(req)
            polls = await polls.json()
            dispatch(userPolls(polls.userPolls))
        }
        catch (error) {
            if (error) throw error
        }
    }
}

export function logOut(username) {
    return async (dispatch)=>{
        var req = new Request("logout",{method:"DELETE",body:JSON.stringify(username)})

        try {
           await fetch(req)
           dispatch(userStatus("Welcome! Please register or log in",""))
           dispatch(loginSwitch())
        } catch (error) {
            if (error) throw error
        }
        }
}