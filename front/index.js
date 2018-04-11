import "babel-polyfill"
import React from 'react' 
import ReactDOM from 'react-dom' 
import App from './App.js' 
import { createStore,applyMiddleware} from "redux";
import mainReducer from "../redux/reducers";
import { fetchPolls, extendSwitch,requestData } from "../redux/actions";
import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux";

const store = createStore(mainReducer,applyMiddleware(thunkMiddleware))



ReactDOM.render(
<Provider store = {store} >
    <App/>
</ Provider >,
document.getElementById('root'))
