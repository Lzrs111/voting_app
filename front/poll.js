import React from "react"
import Pie from './chart.js' 
import './styles.css'


export default class Poll extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            question:props.question,
            votes:props.votes,
            options:props.options,
            extended:false
            }
        this.update=true
        this.renderOptions = this.renderOptions.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
        this.extendSwitch = this.extendSwitch.bind(this);
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            votes:nextProps.votes,
            options:nextProps.options
        })
    }
    extendSwitch() {
        this.setState({
            extended:!this.state.extended
        })
    }
    renderOptions() {
        return Object.values(this.state.options).map(( value,index)=>{
            return (
                    <button  onClick ={()=>{
                        this.props.update([this.props._id,value.text,value._id])
                        }} style={{height:'20%',width:'100%',display:'block'}} >
                        {value.text}{value.votes}
                    </button>
            )
            })
    }
    deleteThis() {
        this.props.delete(this.props._id)
    }
    // only update this component if users have voted for it or if it's being extended
    shouldComponentUpdate(nextProps, nextState) {
        for (var i = 0; i < nextProps['options'].length; i++) {
            if (nextProps['options'][i]['votes'] !=this.state.options[i]['votes']){
                return true
            }else if (nextState.extended !=this.state.extended){
                return true
            }
        }
        return false
    }
    render() {
        var data = ((100-(Object.keys(this.state.options)*20))/2).toString()
        return(
            <div className = 'main'>
                <div className='poll' >
                    <div className='title' onClick={this.extendSwitch} >
                        <h1 style={{margin:"0"}} >{this.state.question}</h1>
                    </ div >
                    {this.state.extended ? 
                    <div className='optionsDiv' style={{marginBottom:data,marginTop:data}} >
                        {this.renderOptions()}
                    </ div >
                    : null}
                </ div >
                {this.state.extended ?
                <div  className = 'pieDiv'>
                    <Pie data={this.state.options} />
                </div>
                : null}
            </div>
        )
    }
}

