import Chart from 'chart.js';
import React from "react"
import ReactDOM from 'react-dom' 
import generateColor from './color.js' 


export default class Pie extends React.Component {
    constructor(props){
        super(props)
        this.drawChart = this.drawChart.bind(this);
        var presets = ['rgba(255, 99, 132',
            'rgba(54, 162, 235',
            'rgba(255, 206, 86',
            'rgba(75, 192, 192',
            'rgba(153, 102, 255',
            'rgba(255, 159, 64']
        this.colors = []
        this.props.data.forEach(element=>{
                do {
                    var color = presets[Math.floor(Math.random()* (presets.length-1))]
                } while (this.colors.includes(color));
                this.colors.push(color)
            })
    }
    componentDidMount () {
        var canvas = ReactDOM.findDOMNode(this)
        var context = ReactDOM.findDOMNode(this).getContext('2d')
        this.drawChart(context,canvas)
  
    }
    componentDidUpdate (prevProps, prevState) {
        var canvas = ReactDOM.findDOMNode(this)
        var context = ReactDOM.findDOMNode(this).getContext('2d')
        this.drawChart(context,canvas)
    }
    drawChart(context,canvas) {
        var labels = []
        var votes = []
        var colors = this.colors
       
        var temporary = this.props.data
        var w = 40/temporary.length-1

        temporary.forEach(element => {
            labels.push(element['text'])
            votes.push(element['votes'])

         
        });

        context.fillStyle = '#f5e9ff'
        context.fillRect(0,0,canvas.width,canvas.height)

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
                maintainAspectRatio: false,
                animation: {
                    duration:0
                },
                legend:{
                    position:'bottom',
                    labels:{
                        boxWidth: w
                    }
                }
            }
        })
    }
    shouldComponentUpdate (nextProps, nextState) {
        for (var i = 0; i < nextProps['data'].length; i++) {
            if (nextProps['data'][i]['votes'] !=this.props.data[i]['votes']){
                return true
            }
        }
    return false
    }
    
    render() {
        return(
                <canvas style={{display:'block',margin:'auto'}} >
                </canvas>
        )
    }
}


