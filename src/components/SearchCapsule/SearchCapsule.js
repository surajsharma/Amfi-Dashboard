import React from 'react';
import './SearchCapsule.css'

class SCDropDown extends React.Component{
  handleChange = e => {
    this.props.action(e.target.value)
  }  
    render(){
        return(
            <div className="DropDownStyle">
                <select onChange={this.handleChange} className="SCDropDown">
                    <option>Fund Houses</option>
                    <option>Funds</option>
                </select>
            </div>
        )
    }
}

export default class SearchCapsule extends React.Component{
    state = {
        searchText:'search..',
        selection:'Fund Houses'
    }

    handleChange = e =>{
      this.state.selection === 'Fund Houses' ? 
        this.props.action(e.target.value) :
      this.props.action2(e.target.value)
    }
    
    ddChange = e =>{
      console.log(e)
      this.setState({selection:e});
    }

    render()
    {
        return (
                <div className="SearchCapsule">
                   <form onSubmit={this.handleSubmit}>
                       <SCDropDown action={this.ddChange}/>
                       <input
                            placeholder={this.state.searchText}
                            onChange={this.handleChange}
                            type="text"/>
                    </form>
                </div>
            )
    }
}