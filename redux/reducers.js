import { combineReducers } from "redux";
import { getPolls,requestData,updatePoll,deletePoll,addPoll,addSwitch,extendSwitch, GET_POLLS, REQUEST_DATA, EXTEND_SWITCH, ADD_SWITCH, LOG_IP} from "./actions";

function asyncRedux(state ={polls: []},action) {
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

function visualRedux(state ={extended:false,adding:false},action) {
    switch (action.type) {
        case EXTEND_SWITCH:
            return Object.assign({},state,{extended:!state.extended})
            break;
        case ADD_SWITCH:
            return Object.assign({},state,{adding:!state.adding})
        default:
            return state
            break;
    }
    
}


const mainReducer = combineReducers({asyncRedux,visualRedux})

export default mainReducer


