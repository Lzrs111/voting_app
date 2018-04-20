import React, { Component } from 'react'
import { connect } from "react-redux";
import { registerUser,loginUser, logOut } from '../redux/actions';

class Header extends Component {
    constructor(props) {
        super(props)
        this.checkStatus = this.checkStatus.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
        window.addEventListener("beforeunload",()=>{
            this.props.dispatch(logOut(this.props.username))
            return null
            })
    }
    
    checkStatus() {
        let status = this.props.userStatus
        switch (status) {
            case "logged in":
                break;
            default:
                return status
                break;
        }
    }
    submit(event,type) {
        if (this.userName.value!="" && this.passWord.value!=""){
            if (type=="register"){
                this.props.dispatch(registerUser({username:this.userName.value,password: this.passWord.value}))
            } else if(type=="login") {
                this.props.dispatch(loginUser({username:this.userName.value,password:this.passWord.value}))
            } 
        } else {
            alert("Please fill in all forms =)")
        }
    }
    render () {
        return (
            <div className="headerDiv">
                <div className ="headerInputsDiv" >
                    <h1 >
                        {this.checkStatus()}
                    </h1>
                </div>
                {this.props.userStatus == "logged in" ?
                <div className ="loginDiv" >
                    <p >
                        Welcome {this.props.username}
                    </p>
                    <button onClick={(event)=>{
                        this.props.dispatch(logOut(this.props.username))
                        }} >
                        Log out
                    </button>
                </div>
                    :
                <div className="loginDiv" >
                    <input placeholder="username" style={{margin:0}} ref={(input)=>{
                        this.userName = input
                        }}/>
                    <input placeholder="password" type="password" style={{margin:0}} ref={(input)=>{
                        this.passWord = input
                        }}/>
                        <button onClick={(event)=>{
                            this.submit(event,"login")
                            }} >
                            Login
                        </button>
                        <button onClick={(event)=>{
                            this.submit(event,"register")
                            }}>
                            Register
                        </button>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
       userStatus: state.userReducer.userStatus,
       username: state.userReducer.username
   } 
}

export default connect(mapStateToProps)(Header)