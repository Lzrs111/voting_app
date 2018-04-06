import React from "react"
import Poll from './poll.js' 
import InputForm from './input.js' 
import './styles.css'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            polls: [],
            adding:false
        }
     // bind methods
    this.renderPolls = this.renderPolls.bind(this)
    this.getPolls = this.getPolls.bind(this)
    this.newPoll = this.newPoll.bind(this);
    this.addSwitch = this.addSwitch.bind(this)
    this.deletePoll = this.deletePoll.bind(this);
    this.updatePoll = this.updatePoll.bind(this)
    }
    componentDidMount() {
        this.getPolls()
    }
    //  gets data from database
    getPolls() {
        var req = new Request("polls",{method:"GET"})

        fetch(req).then(res=>{
            return res.json()
        }).then((data)=>{
            this.setState({
                polls:data
            })
        })
    }
    //  add new poll
    newPoll(body) {
       var req = new Request("add",{method:"POST",body:JSON.stringify(body)})
    // send data to backend, retrieve updated db and set new state   
        fetch(req).then(res=>{
            this.addSwitch()
            return res.json()
        })
        .then((data)=>{
            this.setState({
                polls:data
            })
        })
    }
    deletePoll(id) {
        var req = new Request("del",{method:"DELETE",body:id})
        fetch(req).then(res=>{
            return res.json()
        })
        .then((data)=>{
            this.setState({
                polls:data
            })
        })
    }
    updatePoll(array) {
        var temporary = Object.assign({},array)
        var req = new Request("update",{method:"POST",body:JSON.stringify(temporary)})
        fetch(req).then(res=>{
            return res.json()
        })
        .then((data)=>{
            this.setState({
                polls:data
            })
        })
    }
    addSwitch() {
        this.setState({
            adding:!this.state.adding
        })
    }
    // //  only update if  a new poll is added
    // shouldComponentUpdate (nextProps, nextState) {
    //     if (this.state.adding ||nextState.adding){
    //         return true
    //     }else if (nextState.polls.length  ==this.state.polls.length){
    //         return false
    //     }
    // return true
    // }
    
    renderPolls() {
       return this.state.polls.map((value,index)=>{
            return (
                <Poll update={this.updatePoll} delete={this.deletePoll} question={value.question} votes={value.totalVotes} options={value.options} _id={ value._id} key={index} />
            )
            })
    }
    render() {
        return(
            <div style={{width:"100vw",height:'100vh'}} >
                {this.renderPolls()}
                {this.state.adding ? <InputForm add={this.newPoll} />: null}
                <button  onClick={this.addSwitch} >
                    Add poll
                </button>
            </div>
        )
    }
}