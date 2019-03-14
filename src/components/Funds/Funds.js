import React from 'react';
import './Funds.css';

class Fund extends React.Component
{ 
  constructor(props){
    super(props)
    this.state={
      loading: true
    }
  }

  componentDidMount(){
    this.setState({loading: false})
  }

  render()
  {    
    const fNameDetails = this.props.fund[0][3].split('-');
    const nav = this.props.fund[0][4]
    return(
          <div className="fund box" onClick={this.props.action}>
                <p className="NAV">
                  <span>{nav}</span>
                </p>
            <h4>{fNameDetails[0]}</h4>
            <h3 className="tag is-warning">{fNameDetails[1]}</h3><br/>
            <h3 className="tag is-success">{fNameDetails[2]}</h3>
          </div>            
        )
  }
}

export default class Funds extends React.Component{    
  
     selectNewfund = (e) => {
       this.props.action(e)
    }
  
    render(){      

      // --------------------------------------------------------//
      // const fundlist = this.props.fih.map((fund)=>
      //     <div key={uuidv4()} onClick={this.selectNewfund} >
      //         <Fund fund={fund}/>
      //     </div>);


      return(
            <div className="funds">
                {  this.props.children.map((child)=>
                   <Fund   key={child} 
                           fund={child} action={this.selectNewfund.bind(this, child)} /> )
                }
            </div>
        )
    }
}