import React from 'react'
import './Quandl.css'
import RedrawOnPrint from 'react-highcharts/dist/RedrawOnPrint';
import ReactSpinner from 'react-spinjs-fix';
const ReactHighcharts = require('react-highcharts'); 


export default class Quandl extends React.Component{  
  render(){
    const options = { 
      global: {useUTC: true},
      title:{text:"Fund Performance"},
      series:[{data: this.props.qData.reverse()}],
      chart: {height: "60%"},
      xAxis:{type:'datetime'},
      yAxis:{title:{text:'Net Asset Value (INR)'}},
      legend: {enabled: false},
      credits: {enabled: false}    
  }

    return (
      <div>
      {
        this.props.qData !== null ?
          <RedrawOnPrint>
            <ReactHighcharts config={options}></ReactHighcharts> 
          </RedrawOnPrint>
          :
          <ReactSpinner color="green"/>
      }
      </div>
    )
  }
}