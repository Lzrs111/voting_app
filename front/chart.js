import Chart from 'chart.js';
import React from "react"
import ReactDOM from 'react-dom' 
import generateColor from './color.js' 


export default class Pie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:props.data
            }
        this.drawChart = this.drawChart.bind(this);
        var presets = ['rgba(255, 99, 132',
            'rgba(54, 162, 235',
            'rgba(255, 206, 86',
            'rgba(75, 192, 192',
            'rgba(153, 102, 255',
            'rgba(255, 159, 64']
        this.colors = []
        this.state.data.forEach(element=>{
                do {
                    var color = presets[Math.floor(Math.random()* (presets.length-1))]
                } while (this.colors.includes(color));
                this.colors.push(color)
            })


    }
    componentDidMount () {
        var context = ReactDOM.findDOMNode(this).getContext('2d')
        this.drawChart(context)
  
    }
    componentDidUpdate (prevProps, prevState) {
            var context = ReactDOM.findDOMNode(this).getContext('2d')
            this.drawChart(context)
    }
    drawChart(context) {
        var labels = []
        var votes = []
        var colors = this.colors
       
        var temporary = this.props.data

        temporary.forEach(element => {
            labels.push(element['text'])
            votes.push(element['votes'])

         
        });
        console.log(colors)

        var pie = new Chart(context,{
            type:'pie',
            data:{
                labels:labels,
                datasets:[{
                    label:'# of votes',
                    data:votes,
                    backgroundColor: colors.map((value,index)=>{
                        return value+',0.2)'
                        }) , 
                    borderColor: colors.map((value,index)=>{
                        return value+',1)'
                        }), 
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false
            }
        })
    }
    render() {
        return(
                <canvas width="400" height = '400px' >
                </canvas>
        )
    }
}


