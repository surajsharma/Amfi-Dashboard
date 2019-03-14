import React from 'react'
import Quandl from './Quandl/Quandl'
import './DetailView.css'
require('dotenv').config()


export default class DView extends React.Component{
  state = {qData: null, loading: false}

  componentDidMount(){
    this.getQuandlData(this.props.fundnowcode);
  }

  componentDidUpdate(prevProps){
    if(this.props.fundnowcode !== prevProps.fundnowcode){ 
      this.getQuandlData(this.props.fundnowcode)
    }
  }
  
  getQuandlData = fundcode => {
    this.setState({loading: true})    
    if(fundcode != null){
      console.log('Getting Quandl data...')
      const URL = 'https://www.quandl.com/api/v3/datasets/AMFI/'+fundcode+'?api_key='+process.env.REACT_APP_Q

      fetch(URL)
        .then(response => response.json())
        .then(data => {
          const d = data.dataset.data.map(function(d){
            return [new Date(d[0]).getTime(), d[1]];
          });
          // console.log(d)
          // Prints result from `response.json()` in getRequest
          this.setState({qData: d, loading:false})
        })
        .catch(error => console.error(error))        
    }
  }
  
  render(){
    return(
      <div className="dview">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <p className="title">
                {this.props.house.replace('Mutual Fund', '')}
              </p>
              <p className="detail">
                {this.props.fundnow.split('-')[0]}
              </p>
            </div>
          </div>
        </section>
        <div className="chart">
          {
              this.state.qData !== null 
              ? 
              <Quandl qData={this.state.qData} 
                      loading={this.state.loading}/>
              : 
              "No fund selected"
          }
        </div>
      </div>
    )
  }
}