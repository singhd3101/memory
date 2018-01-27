import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}

//App state of the applicatione is:
//   card : String 
//   cardValues: Array   
//   ctr: Integer

const cards = ['FA','AB','BA','HB','CA','DB','DA','CB','EA','EB','AA','FB','GA','GB','HA','BB'];
const timer = 1000;

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.updateLayout = this.updateLayout.bind(this);
    this.updateCtr = this.updateCtr.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this.state = {
	card: null,
        cardValue: cards,
	ctr:0			
     };
  }

  //updates the state of the game
  updateLayout(cardLayout) {
   this.setState(_.extend(this.state, {
	card: cardLayout
   }));
  }

  //updates click counter
  updateCtr(k) {
   let newVal = k + 1;
   this.setState(_.extend(this.state, {
	ctr: newVal }));
  }

  //restarts the game
  restartGame() { 
    //reset layout
    let resetCardValue = this.state.cardValue;
    for(var counter=0; counter<resetCardValue.length; counter++) {
	let c = document.getElementById(resetCardValue[counter]);
	//enable all cards
	c.disabled = false;
	//face-down all cards
	c.innerHTML="";
	}

	this.setState(_.extend(this.state, {
	card: null,
	//shuffle the cards for the new game
	cardValue: _.shuffle(this.state.cardValue),
	ctr:0
	}));
  }  

//renders the layout
render() {
return (
<div class="container" className="layout">
	<br/>
   <div className="count">You have clicked {this.state.ctr} times</div>
	<br/><br/>
   <div id="layout">
       <div class="row">
	<div class="col">
	   <Card id={this.state.cardValue[0]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[1]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[2]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[3]} root={this}/></div>
       </div><br/><br/>
       <div class="row">
	<div class="col">
	   <Card id={this.state.cardValue[4]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[5]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[6]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[7]} root={this}/></div>
       </div><br/><br/>
       <div class="row">
	<div class="col">
	   <Card id={this.state.cardValue[8]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[9]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[10]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[11]} root={this}/></div>
       </div><br/><br/>
       <div class="row">
	<div class="col">
	   <Card id={this.state.cardValue[12]} root={this}/></div>
	<div class="col">	
	   <Card id={this.state.cardValue[13]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[14]} root={this}/></div>
	<div class="col">
	   <Card id={this.state.cardValue[15]} root={this}/></div>
       </div>
   </div><br/><br/>
   <div>
       <button className="restart" onClick={this.restartGame}>Restart Game</button>
   </div>
</div>);}
}

function Card(props) {

   function matchCards(newEvent) {
	let prevEvent = props.root.state.card;
	let currEvent = newEvent.target.id;	
	let ptr = document.getElementById('layout');

	if(prevEvent!=currEvent) {
   	let card1 = props.root.state.card;
   	let card2 = newEvent.target;
	let c1 = document.getElementById(card1);
   	card2.innerHTML=card2.id.charAt(0);
 
   	if(card1==null) {
		props.root.updateLayout(card2.id);
  	 }	
   	else if(card1.charAt(0)==card2.id.charAt(0)) {
		props.root.updateLayout(null);
		//disable clicks
		ptr.style.pointerEvents = 'none';
		setTimeout(() => {
			c1.disabled = true;
			card2.disabled = true;
			ptr.style.pointerEvents = 'auto';
		},timer);
	}
	else{
		//disable clicks
		ptr.style.pointerEvents = 'none';
		setTimeout(() => {
			props.root.updateLayout(null);
			c1.innerHTML="";
			card2.innerHTML="";
			//enable clicks
			ptr.style.pointerEvents='auto';
		},timer);;
	}
	
	//update cclicks counter
	props.root.updateCtr(props.root.state.ctr);
      }
   }
    return(
	<button className="card card-picked" id={props.id} onClick={matchCards}/>
);}
