import React from "react"


export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            polls: []
        }
    }
    componentDidMount() {
        //  and get request here
    }
    renderPolls() {
        this.state.polls.map((value,index)=>{
            return (
                <Poll options={value.options} key={index} />
            )
            })
    }
    render() {
        return(
            <div>
                <p>
                    hello world
                </p>
            </div>
        )
    }
}