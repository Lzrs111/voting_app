import React from "react"
import Pie from './chart.js' 


export default class Poll extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            question:props.question,
            votes:props.votes,
            options:props.options,
            extended:false
            }
        this.renderOptions = this.renderOptions.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
        this.extendSwitch = this.extendSwitch.bind(this);
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            question:nextProps.question,
            votes:nextProps.votes,
            options:nextProps.options
        })
    }
    componentDidMount () {
        console.log(this.state.options)
    }
    extendSwitch() {
        this.setState({
            extended:!this.state.extended
        })
    }
    renderOptions() {
        return Object.values(this.state.options).map(( value,index)=>{
            return (
                <div>
                    <button  onClick ={()=>{
                        this.props.update([this.props._id,value.text,value._id])
                        }} >
                        {value.text}
                    </button>
                    {value.votes}
                </div>
            )
            })
    }
    deleteThis() {
        this.props.delete(this.props._id)
    }
    render() {
        return(
            <div>
                <h1 onClick={this.extendSwitch} >
                    {this.state.question}
                </h1>
                {this.state.extended ? 
                    <div  >
                        {this.renderOptions()}
                        <button onClick={this.deleteThis} >
                            Delete
                        </button>
                        <Pie data={this.state.options} />
                    </div>
                : null}
            </div>
            
        )
    }
}
