import { combineReducers } from "redux";
import { getPolls,requestData,updatePoll,deletePoll,addPoll,addSwitch, GET_POLLS, REQUEST_DATA,  ADD_SWITCH, LOG_IP, USER_STATUS,LOGIN_SWITCH, USER_POLLS} from "./actions";

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

function userReducer(state={userStatus:"Welcome! Please register or log in",username:"",loggedIn: false,userPolls:[]},action) {
    switch (action.type) {
        case USER_STATUS:
            return Object.assign({},state,{userStatus:action.userStatus,username: action.username})
            break;
        case LOGIN_SWITCH:
            return Object.assign({},state,{loggedIn:!state.loggedIn})
        case USER_POLLS:
            return Object.assign({},state,{userPolls:action.userPolls})
            break;
        default:
            return state
            break;
    }
}


const mainReducer = combineReducers({asyncRedux,visualRedux,userReducer})

export default mainReducer


