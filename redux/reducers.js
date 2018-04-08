import { combineReducers } from "redux";
import { getPolls,requestData,updatePoll,deletePoll,addPoll,addSwitch,extendSwitch} from "./actions";

export function mainRedux(state,action) {
    switch (action.type) {
        case GET_POLLS:
            return Object.assign({},state,{polls:action.polls,fetching:false})
            break;
        case REQUEST_DATA:
            return Object.assign({},state,{fetching:true})
            break;
        default:
            return state
            break;
    }
}


