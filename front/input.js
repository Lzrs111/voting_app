import React from "react"


export default class InputForm extends React.Component {
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
            this.props.add(this.state)
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
        },()=>{
            console.log(this.state)
            })
    }
    renderChoice() {
    }
    render() {
        return(
            <form onSubmit={this.submit} >
                <label>
                        Question
                      <input type='text' placeholder='Enter question' onChange={()=>{
                          this.questionChange(event)
                          }} ref={(input)=>{
                              this.question = input
                              }} >
                      </input>
                  </label>
                  <label>
                      Choice 1
                      <input type='text' placeholder='Enter choice' onChange={()=>{
                          this.change(event,0)
                          }} ref={(input)=>{
                            this.c1 = input
                            }} >
                      </input>
                  </label>
                  <label>
                      Choice 2
                      <input type='text' placeholder='Enter choice' onChange={()=>{
                          this.change(event,1)
                          }}ref={(input)=>{
                            this.c2 = input
                            }} >
                      </input>
                  </label>

            <input type = 'submit' value = 'submit' >
            </input>
            </form>
        )
    }
}