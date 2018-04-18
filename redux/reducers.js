import { combineReducers } from "redux";
import { getPolls,requestData,updatePoll,deletePoll,addPoll,addSwitch, GET_POLLS, REQUEST_DATA,  ADD_SWITCH, LOG_IP} from "./actions";

function asyncRedux(state ={polls: [],fetching:true},action) {
    switch (action.type) {
        case GET_POLLS:
            return Object.assign({},state,{polls:action.polls,fetching:false})
            break;
        case REQUEST_DATA:
            return Object.assign({},state,{fetching:true})
            break;
        case LOG_IP:
            return Object.assign({},state,{ip:action.ip})
            break;
        default:
            return state
            break;
    }
}

function visualRedux(state,action) {
    switch (action.type) {
        case ADD_SWITCH:
            console.log(state.adding,!state.adding)
            return Object.assign({},state,{adding:!state.adding})
        default:
        return {adding:false}
            break;
    }
    
}


const mainReducer = combineReducers({asyncRedux,visualRedux})

export default mainReducer


