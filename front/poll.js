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
    } 
    renderOptions() {
        return Object.values(this.props.options).map(( value,index)=>{
            return (
                    <button  className="optionsButton"  onClick ={()=>{
                        this.update({id:this.props._id,votedFor:value._id,ip:this.props.ip})
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
        this.props.dispatch(deletePoll(this.props._id))
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
    render() {
        var mainStyle = this.state.extended ? {height:"60%"} :{height:"auto"}
        return(
            <div className = 'main'  style={mainStyle}>
                <div className='poll' >
                    <div className='title'>
                        <h1 onClick={this.extendSwitch}>{this.props.question}</h1>
                        <div style={{width:"10%"}}>
                            <button onClick={this.deleteThis} style={{display:"block",margin:"auto"}}>
                             X
                            </button>
                        </div>
                    </ div >
                    {this.state.extended ? 
                        <div className='optionsDiv' >
                        <div className='flexWrapper' > 
                            {this.renderOptions()}
                            </ div >
                        </ div >
                : null}
                {this.state.extended?
                <div  style={{height:"80%",width:"70%",display:'inline-block'}} >
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
    }
}


export default connect(mapStateToProps)(Poll)
