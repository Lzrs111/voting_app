import React from "react"
import Pie from './chart.js' 
import './styles.css'
import { updatePoll, deletePoll} from "../redux/actions.js";
import { connect } from "react-redux";



class Poll extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            extended: false
        };
        this.renderOptions = this.renderOptions.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
        this.update = this.update.bind(this)
    } 
    renderOptions() {
        return Object.values(this.props.options).map(( value,index)=>{
            return (
                    <button  onClick ={()=>{
                        this.update({id:this.props._id,votedFor:value._id})
                        }} style={{height:'20%',width:'100%',display:'block'}} >
                        {value.text}{value.votes}
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
    render() {
        return(
            <div className = 'main'>
                <div className='poll' >
                    <div className='title' onClick={()=>{
                        this.extendSwitch()
                        }}>
                        <h1 style={{margin:"0"}} >{this.props.question}</h1>
                    </ div >
                    {this.state.extended ? 
                    <div className='optionsDiv' >
                        {this.renderOptions()}
                    </ div >
                    : null}
                </ div >
                {this.props.extended ?
                <div  className = 'pieDiv'>
                    <Pie data={this.props.options} />
                </div>
                : null}
                <button onClick={this.deleteThis} >
                Delete poll
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        extended: state.visualRedux.extended
    }
}


export default connect(mapStateToProps)(Poll)
