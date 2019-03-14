import React from 'react'

export default class Navbar extends React.Component{
  render(){
    return(
      <nav className="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://surajsharma.github.io">
            <h2 className=" is-white is-large tag">AMFII DASHBOARD</h2>
          </a>
        </div>
      </nav>
      )
  }
}