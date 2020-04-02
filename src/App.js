import React from 'react';
import './App.css';
import axios from 'axios';
import Tyrell from "./components/Tyrell";
import Targaryen from "./components/Targaryen";
import Lannister from "./components/Lannister";
import Baratheon from "./components/Baratheon";
import BaratheonR from "./components/BaratheonR";
import StarkFounder from "./components/StarkFounder";

 class App extends React.Component {
   constructor(props){
    super(props);
    this.state={
      tyrell: null,
      targaryen:null,
      lannister: null,
      baratheon: null,
      baratheonR: null,
      starkFounder: null
    }
  }
  firstFiveQuestions(){
    const requestTyrell=axios.get("https://anapioficeandfire.com/api/characters/16");
    const requestTargaryen=axios.get("https://www.anapioficeandfire.com/api/houses/378");
    const requestLannister=axios.get("https://www.anapioficeandfire.com/api/houses/229");
    const requestBaratheon=axios.get("https://www.anapioficeandfire.com/api/houses/17");
    const requestBaratheonR=axios.get("https://www.anapioficeandfire.com/api/characters/901");
    axios.all([requestTyrell,requestTargaryen, requestLannister, requestBaratheon, requestBaratheonR])
    .then(axios.spread((...responses)=> {
     this.setState({tyrell: responses[0].data});
     this.setState({targaryen: responses[1].data});
     this.setState({lannister: responses[2].data});
     this.setState({baratheon: responses[3].data});
     this.setState({baratheonR: responses[4].data});
    })).catch(errors=>{console.log(errors)})
  }

  async getStarkFounder(){
    try{
      const starkHouse= await axios.get("https://www.anapioficeandfire.com/api/houses/362");
      const founderInfo=await axios.get(starkHouse.data.founder);
      this.setState({starkFounder: founderInfo.data});
    }
    catch(e){
      console.log(e);
    }
  }


  componentDidMount(){
    this.firstFiveQuestions();
    this.getStarkFounder();
  }

  render(){
  return (
    <div className="App">
      <h3>Where was Margaery Tyrell born?</h3>
      <Tyrell info={this.state.tyrell}/>
      <h3>What region is House Targaryen in?</h3>
      <Targaryen info={this.state.targaryen}/>
      <h3>What's the coat of arms of House Lannister?</h3>
      <Lannister  info={this.state.lannister}/>
      <h3>What is the second seat of House Baratheon?</h3>
      <Baratheon info={this.state.baratheon} />
      <h3>What is Robert Baratheon's second alias?</h3>
      <BaratheonR info={this.state.baratheonR}/>
      <h3>What's the name of the founder of House Stark?</h3>
    <StarkFounder info={this.state.starkFounder} />
    </div>
  );
}
   }
export default App;
