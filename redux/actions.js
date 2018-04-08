import { dispatch,combineReducers } from "redux";
export const GET_POLLS = 'GET_POLLS'

export function getPolls(json) {
    return {
        type:GET_POLLS,
        polls:json 
    }
}

export const UPDATE_POLL ='UPDATE_POLL' 

export function updatePoll(id) {
    return {
        type:UPDATE_POLL
    }
}

export const DELETE_POLL = 'DELETE_POLL'

export function deletePoll(id) {
    return {
        type: DELETE_POLL
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

function fetchPolls() {
    return (dispatch)=>{
        dispatch(requestData())
        var req = new Request("polls",{method:"GET"})
        return fetch(req).then((res)=>{
            return res.json()
            })
            .then((data)=>{
                dispatch(getPolls(data))
                })
        }
}