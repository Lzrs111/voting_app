import React from "react"
import Poll from './poll.js' 
import InputForm from './input.js' 
import './styles.css'
import { getPolls, fetchPolls, addSwitch,fetchIp } from "../redux/actions.js";
import { connect } from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props)
     // bind methods
    this.renderPolls = this.renderPolls.bind(this)
    this.addSwitch = this.addSwitch.bind(this)
    }
    componentDidMount () {
        this.props.dispatch(fetchIp())
        this.props.dispatch(fetchPolls())
    }
    addSwitch() {
       this.props.dispatch(addSwitch()) 
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
                {this.renderPolls()}
                <button onClick={this.addSwitch}>
                {this.props.adding ? "Cancel": "Add"}
                </button>
                {this.props.adding ? <InputForm /> : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        polls:state.asyncRedux.polls,
        adding: state.visualRedux.adding,
        ip:state.asyncRedux.ip
    }
}


export default connect(mapStateToProps)(App)
