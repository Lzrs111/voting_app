import React from "react"
import Pie from './chart.js' 
import './styles.css'
import { updatePoll, deletePoll,changeChart} from "../redux/actions.js";
import { connect } from "react-redux";



class Poll extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            extended: false,
            type:"pie"
        };
        this.renderOptions = this.renderOptions.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
        this.update = this.update.bind(this)
        this.extendSwitch = this.extendSwitch.bind(this)
        this.changeChart = this.changeChart.bind(this);
        this.mainStyle = this.mainStyle.bind(this)
    } 
    renderOptions() {
        return Object.values(this.props.options).map(( value,index)=>{
            return (
                    <button  className="optionsButton"  onClick ={()=>{
                        
                            this.update({id:this.props._id,votedFor:value._id,ip:this.props.ip,loggedIn:this.props.loggedIn,username:this.props.username})

                        }} >
                        {value.text}  {value.votes}
                    </button>
            )
            })
    }
    update(obj) {
        this.props.dispatch(updatePoll(obj))
    }
    deleteThis() {
        this.props.dispatch(deletePoll({id:this.props._id,username:this.props.username}))
    }
    extendSwitch() {
        this.setState({
            extended: !this.state.extended
        })
    }
    changeChart(type) {
        this.setState({
            type:type
        })
    }
    mainStyle() {
        var mainStyle = {}
        if (this.state.extended){
           if (window.innerWidth<=480){
               mainStyle={height:"40%"}
           } else if (window.innerWidth <=800 && window.innerWidth > 480) {
               mainStyle = {height:"50%"}
           } else {
               mainStyle = {height:"60%"}
           }
        } else {
            mainStyle = {height:"auto"}
        }
        return mainStyle
        
    }
    render() {
        return(
            <div className = 'main' style={this.mainStyle()}>
                <div className='poll' >
                    <div className='title'>
                        <p onClick={this.extendSwitch} >
                            {this.state.extended ? "-" : "+"}
                        </p>
                        <h1 style={{width:"80%"}} onClick={this.extendSwitch}>{this.props.question}</h1>
                        {this.props.loggedIn && (this.props.userPolls.includes(this.props._id)) ? 
                        <div style={{width:"10%"}}>
                            <button onClick={this.deleteThis} style={{display:"block",margin:"auto"}}>
                             X
                            </button>
                        </div>
                        :null}
                    </ div >
                    {this.state.extended ? 
                        <div className='optionsDiv' >
                        <div className='flexWrapper' > 
                            {this.renderOptions()}
                            </ div >
                        </ div >
                : null}
                {this.state.extended?
                <div  style={{height:"90%",width:"70%",display:'inline-block'}} >
                        <div  className = 'pieDiv'>
                            <Pie data={this.props.options} type={this.state.type}/>
                        </div>
                        <div  className='chartStyle' >
                            <button  onClick={()=>{
                                this.changeChart('pie')
                                }} >
                               Pie
                            </button>
                            <button  onClick={()=>{
                                this.changeChart('bar')
                                }}>
                                Bar
                            </button>
                        </div>
                        </ div >
                :null}
            </div>
        </ div >
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.userReducer.loggedIn,
        username: state.userReducer.username,
        userPolls: state.userReducer.userPolls
    }
}


export default connect(mapStateToProps)(Poll)
