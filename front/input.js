import React from "react"
import { connect } from "react-redux";
import { newPoll, addSwitch } from "../redux/actions";


class InputForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            choices:{
                0:'',
                1:'',
            },
            question:''
        };
        this.submit = this.submit.bind(this)
        this.renderChoice = this.renderChoice.bind(this);
        this.change = this.change.bind(this);
        this.questionChange = this.questionChange.bind(this);
        this.addChoice = this.addChoice.bind(this)
        this.labelStyle = this.labelStyle.bind(this)
    }
    submit(event) {
        event.preventDefault()
        var inputs = [this.question,this.c1,this.c2]
        var check = true
        inputs.forEach(element => {
            if (element.value =='' ){
                element.style.outlineColor = "red"
                element.focus()
                check = false
            }
        });
        if (check){
            this.props.dispatch(newPoll(Object.assign({},this.state,{loggedIn:this.props.loggedIn,username:this.props.username})))
        }

    }
    change(event,index) {
        var temporary = this.state.choices
        temporary[index] = event.target.value
        this.setState({
            choices:temporary
        })
    }
    questionChange(event) {
        var temporary = event.target.value
        this.setState({
            question:temporary
        })
    }
    renderChoice() {
        var temporary = this.state.choices
        var t = []
        for (var i = 2; i < Object.keys(temporary).length; i++) {
            if (temporary.hasOwnProperty(i)){
                t.push(
                    <label style={this.labelStyle()}>
                        <div className='choiceDiv' >
                            <span  className='choiceText' >
                                Choice {i+1}
                            </span>
                            <input type='text' placeholder='Enter choice' onChange={()=>{
                                this.change(event,i-1)
                                }} >
                            </input>
                        </ div >
                    </label>
                )
            }
        }
        return t
    }
    addChoice() {
        var temporary = this.state.choices
        if (Object.keys(temporary).length <4){
            temporary[Object.keys(temporary).length] = ''
            this.setState({
                choices:temporary
            })
        }
    }
    labelStyle() {
        var temporary = Object.keys(this.state.choices).length
        console.log(window.innerWidth)
        if (window.innerWidth >480){
            return {}
        } else {
            var style = {}
            switch (temporary) {
                case 2:
                    style = {height: "33.3%"}
                    break;
                case 3:
                    style = {height: "25%"}
                break;
                case 4:
                    style =  {height: "20%"}
                    break;
            }
            return style
        }
    }
    render() {
        // hardcoded number of choices to 2 
        return(
            <div className='inputDiv'>
                <div className='inputBox' >
                    <form onSubmit={this.submit} className="inputForm">
                        <div  className='choiceWrap' >
                            <label style={this.labelStyle()}>
                                <div className='choiceDiv' >
                                <span  className='choiceText' >
                                    Question
                                </span>
                                <input type='text' placeholder='Enter question' onChange={()=>{
                                    this.questionChange(event)
                                    }} ref={(input)=>{
                                        this.question = input
                                            }} >
                                    </input>
                                    </ div >
                                </label>
                                <label style={this.labelStyle()}>
                                    <div className='choiceDiv' >
                                        <span  className='choiceText' >
                                            Choice 1
                                        </span>
                                        <input type='text' placeholder='Enter choice' onChange={()=>{
                                            this.change(event,0)
                                            }} ref={(input)=>{
                                            this.c1 = input
                                            }} >
                                        </input>
                                    </ div >
                                </label>
                                <label style={this.labelStyle()}>
                                    <div className='choiceDiv' >
                                        <span  className='choiceText'>
                                            Choice 2
                                        </span>
                                        <input type='text' placeholder='Enter choice' onChange={()=>{
                                            this.change(event,1)
                                            }}ref={(input)=>{
                                            this.c2 = input
                                            }} >
                                        </input>
                                    </ div >
                                </label>
                                {this.renderChoice()}
                        </ div >
                        <div className="submitButtonDiv">
                            <input type = 'submit' value = 'submit' className="submitButton" >
                            </input>
                        </ div >
                    </form>
                <div className="addCancelDiv">
                <button  onClick={this.addChoice} >
                    Add choice
                </button>
                <button  onClick={()=>{
                    this.props.dispatch(addSwitch())
                    }} >
                    Cancel
                </button>
                </ div >
            </ div >
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.userReducer.loggedIn,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps)(InputForm)