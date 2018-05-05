import React from "react"
import Header from "./header.js"
import Poll from './poll.js' 
import InputForm from './input.js' 
import './styles.css'
import { getPolls, fetchPolls, addSwitch,fetchIp, logOut } from "../redux/actions.js";
import { connect } from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props)
     // bind methods
    this.renderPolls = this.renderPolls.bind(this)
    this.addSwitch = this.addSwitch.bind(this)
    this.logOutTimer = this.logOutTimer.bind(this)

    this.timer;
    }
    componentDidMount () {
        // when component mounts fetch user IP and polls. The ip is necessary later for vote checks
        this.props.dispatch(fetchIp())
        this.props.dispatch(fetchPolls())

        //logout timer
        document.addEventListener("click",this.logOutTimer)
    }
    addSwitch() {
       this.props.dispatch(addSwitch()) 
    }
    logOutTimer() {

        if (typeof(this.timer)!="undefined"){
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(()=> {
            if (this.props.loggedIn) {
                this.props.dispatch(logOut(this.props.username))
            }
            },10000)
        
    }
    renderPolls() {
        if (this.props.polls){
            return this.props.polls.map((value,index)=>{
                return (
                    <Poll question={value.question} votes={value.totalVotes} options={value.options} _id={ value._id} key={index}  ip={this.props.ip} />
                )
          })
        }
    }
    render() {
        return(
            <div style={{width:"100vw",height:'100vh'}} >
                <Header />
                {this.props.fetching ?  
                <h1 style={{marginLeft:"auto",marginTop:"1.5%",marginRight:"auto"}} >
                    Fetching polls...
                </h1>
                :<div  style={{height:'100%',width:'100%'}}>
                    {this.renderPolls()}

                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop: "1.5%"}} >
                        <button onClick={()=>{
                            this.addSwitch()
                            }}  className='addButton' >
                            Add poll
                    </button>
                    </ div >
                </ div>}
                    {/* if adding show Input Form for new polls */}
                    {this.props.adding ? <InputForm /> : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        polls:state.asyncRedux.polls,
        adding: state.visualRedux.adding,
        ip:state.asyncRedux.ip,
        fetching:state.asyncRedux.fetching,
        username: state.userReducer.username,
        loggedIn: state.userReducer.loggedIn
    }
}


export default connect(mapStateToProps)(App)
