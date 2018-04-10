import { dispatch,combineReducers } from "redux";
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

export function fetchPolls() {
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

export function deletePoll(id) {
    return (dispatch)=>{
        var req = new Request("del",{method:"DELETE",body:id})
        fetch(req).then(res=>{
            return res.json()
        }).then((data)=>{
            dispatch(getPolls(data))
            })
        }
}

export function updatePoll(obj) {
    return (dispatch)=>{

        var ip = new Request("http://api.ipstack.com/check?access_key="+process.env.API_KEY,{method:"GET"})
        
        fetch(ip).then(res=>{
            return res.json()
        },(reason)=>{
            console.log("=)")
            })
        .then((data)=>{
            data = Object.assign({},obj,{ip:data["ip"]})
            console.log("sending ",data," to db")
            var req = new Request("update",{method:"POST",body:JSON.stringify(data)})

            fetch(req).then(
                (success)=>{
                    return success.json()
                }
                ).then((data)=>{
                    if (typeof(data)=="string"){
                        alert(data)
                    } else {
                        dispatch(getPolls(data))
                    }
                    })
            })
        }
}

export function newPoll(body) {
    return (dispatch)=>{
        dispatch(addSwitch())
        var req = new Request("add",{method:"POST",body:JSON.stringify(body)})
        fetch(req).then(res=>{
            return res.json()
        }).then((data)=>{
            dispatch(getPolls(data))
            })
        }
}