import React from "react"
import Poll from './poll.js' 
import InputForm from './input.js' 
import './styles.css'
import { getPolls, fetchPolls, addSwitch,fetchIp } from "../redux/actions.js";
import { connect } from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props)
     // bind methods
    this.renderPolls = this.renderPolls.bind(this)
    this.addSwitch = this.addSwitch.bind(this)
    this.generateStyle = this.generateStyle.bind(this);
    }
    componentDidMount () {
        // when component mounts fetch user IP and polls. The ip is necessary later for vote checks
        this.props.dispatch(fetchIp())
        this.props.dispatch(fetchPolls())
    }
    addSwitch() {
       this.props.dispatch(addSwitch()) 
    }
    renderPolls() {
        if (this.props.polls){
            return this.props.polls.map((value,index)=>{
                return (
                    <Poll question={value.question} votes={value.totalVotes} options={value.options} _id={ value._id} key={index}  ip={this.props.ip} />
                )
          })
        }
    }
    generateStyle() {
        var style = {borderRadius:'50%',border:'none'}
        if (this.props.adding){
            style=Object.assign({},style,{backgroundColor:'darkred'})
        }else {
            style=Object.assign({},style,{backgroundColor:'lightgreen'})
            }
        return style
    }
    render() {
        return(
            <div style={{width:"100vw",height:'100vh'}} >
                
                {this.props.fetching ?  
                <h1 >
                    Fetching polls...
                </h1>
                :<div  style={{height:'100%',width:'100%'}}>
                    {this.renderPolls()}

                     {/*button for adding polls and it's behavior. It varies depending on this.props.adding  */}
                    <button onClick={this.addSwitch} style={this.generateStyle()} >
                    {this.props.adding ? 
                        <span style={{color:'red',fontSize:"200%"}} >
                        -
                        </span>
                        : <span style={{color:'green',fontSize:'200%'}} >
                            +                       
                        </span > }
                    </button>
                </ div>}
                    {/* if adding show Input Form for new polls */}
                    {this.props.adding ? <InputForm /> : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        polls:state.asyncRedux.polls,
        adding: state.visualRedux.adding,
        ip:state.asyncRedux.ip,
        fetching:state.fetching
    }
}


export default connect(mapStateToProps)(App)
