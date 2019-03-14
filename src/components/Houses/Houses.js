import React from 'react';
import './Houses.css';

export default class Houses extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      funds : []
    }
  }
  
  selectNewHouse = (e) => {
        this.props.action(e)
        console.log(e)
  }

  render(){ 
        return(
              <div className='houses'>
                  {this.props.children.map((child)=>
                   <div onClick={this.selectNewHouse.bind(this, child)}//perf isssue? 
                        key={child} 
                        className='house box'>
                        {child} <br/> 
                        <p className='tag is-light'>{this.props.offers}</p>
                   </div>)}
              </div>
            )
  }
}