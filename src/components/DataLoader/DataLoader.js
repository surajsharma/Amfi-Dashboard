import React from 'react'
import Houses from '../Houses/Houses'
import Funds from '../Funds/Funds'
import DView from '../DetailView/DetailView'
import Navbar from '../Navbar/Navbar'
import SearchCapsule from '../SearchCapsule/SearchCapsule'
import ReactSpinner from 'react-spinjs-fix';

export default class DataLoader extends React.Component{

  constructor(props){
    super(props)    
    this.state = {
      data: [],
      houses: [],
      fhouses: [],
      funds: [],
      ffunds:[],
      fundsinhouse:[],
      housenow: 'Aditya Birla Sun Life Mutual Fund',
      query: '',
      fundnow: null,
      fundnc: null,
      loading: true
    }
  }  
  
  componentDidMount(){
    this.foobar()
    //foobar -> readline -> househandler
  }
  
  foobar = () => {
    fetch("https://cors-anywhere.herokuapp.com/https://www.amfiindia.com/spages/NAVAll.txt")
    .catch(error => console.error(error))
    .then(data => 
          console.log((data.text()
            .then((text) => {
                  data = this.readline(text);
    }))))
  }  
  
  readline = (data) => {
    let AMFI = data.split("\n")
    let funds = 
        AMFI.filter(fund => fund.match(/(\d{6}).+/g) != null)
        .map(fund => fund.match(/(\d{6}).+/g))
    let houses = 
        AMFI.filter(house => house.match(/Mutual Fund[\n\r]/g) != null)
        .map(house => house.match(/.+Mutual Fund[\n\r]/g))
    let json = [];

    houses = [...new Set(houses.map(item => item[0]))]  
    this.setState({houses:houses, fhouses:houses})

    funds = funds.map(nested => nested.map(fund => fund.split(';')));

    this.setState({funds: funds, loading:false, fundnow:funds[0][0][3], fundnc:funds[0][0][0]})
    console.log(this.state.fundnc, this.state.fundnow, this.state.housenow);
    
    this.houseHandler(this.state.housenow)
    return json
  }  
  
  houseByhouse = (house, funds, json) => {
    let data = [];
    let fundsinhouse = 
        funds.filter((fund)=>house.split(' ')[0]===fund[0][3].split(' ')[0]);
    
    data.push({"house":house, "funds":fundsinhouse})
    json.push(data)
  } 
  
  houseHandler = (datafromchild) => {
    let fundsinhouse = 
        this.state.funds.filter((fund)=>datafromchild.split(' ')[0]===fund[0][3].split(' ')[0]);

    this.setState({
      housenow: datafromchild,
      fundsinhouse: fundsinhouse,
      ffunds: fundsinhouse,
      fundnow:fundsinhouse[0][0][3],
      fundnc:fundsinhouse[0][0][0]
    })

    // console.log('houseHandler: ', fundsinhouse[0][0][3], this.state.fundsinhouse.length)
  }

  filterdata = (e) => {
    let el = e.toLowerCase()
    let rgx = RegExp(el,'g');
    let fh = []
    
    for(let i=0; i<this.state.houses.length; i++){
      if(rgx.test(this.state.houses[i].toLowerCase())){
        fh.push(this.state.houses[i])
      }
    }
    
    // const fh = this.state.houses.filter((house)=>
    //            house.toLowerCase().indexOf(el)===0);
    
    this.setState({fhouses:fh});    
  }
  
  filterfunds = e => {
    let el = e.toLowerCase()
    let rgx = RegExp(el,'g');
    let ff = []
    
    for(let i=0; i<this.state.fundsinhouse.length; i++){
      if(rgx.test(this.state.fundsinhouse[i][0][3].toLowerCase())){
        ff.push(this.state.fundsinhouse[i])
      }
    }
    
    this.setState({ffunds:ff});
  }
  
  fundHandler = e => { 
    console.log(e[0])
    this.setState({
      fundnow: e[0][3],
      fundnc: e[0][0]
    })
    console.log('fundHandler')
  }

  render(){ 
    return(
      <div>
        <Navbar className="navbar"/>
        <SearchCapsule action={this.filterdata} action2={this.filterfunds}/> 
        {
         this.state.loading ? <ReactSpinner color="green"/> :
          <div>
            <div className='appContainer'>
              <div className='columns is-desktop'>         
                <div className="column is-3">
                  <Houses   action={this.houseHandler} 
                            funds={this.state.funds} 
                            offers={this.state.fundsinhouse.length}>
                    {this.state.fhouses}
                  </Houses>          
                </div>
                <div className="column is-4">
                  <Funds action={this.fundHandler}>
                      {this.state.ffunds}
                  </Funds>          
                </div>
                <div className="column is-5" >
                  <DView className="dview" 
                         house={this.state.housenow} 
                         fundnow={this.state.fundnow}
                         fundnowcode={this.state.fundnc} 
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )  
  }
}