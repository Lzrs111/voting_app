import React from 'react' 
import ReactDOM from 'react-dom' 
import App from './App.js' 
import { createStore } from "redux";
import { mainRedux } from "../redux/reducers";

const store = createStore(mainRedux)


ReactDOM.render(<App/>,document.getElementById('root'))