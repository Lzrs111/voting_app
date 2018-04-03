import React from "react"


export default class Poll extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            question:props.question,
            votes:props.votes,
            options:props.options
            }
        this.renderOptions = this.renderOptions.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            question:nextProps.question,
            votes:nextProps.votes,
            options:nextProps.options
        })
    }
    renderOptions() {
        return Object.values(this.state.options).map(( value,index)=>{
            return (
                <div>
                    {value.text}
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
                <h1>
                    {this.state.question}
                </h1>
                {this.renderOptions()}
                <button  onClick={this.deleteThis} >
                delete
                </button>
            </div>
            
        )
    }
}
