import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

//Attributon Goes to -> Google.com, youtube.com and Codepen.io
 
export default function run_demo(root,channel) {
  ReactDOM.render(<Demo channel={channel}/>, root);
}

//App state of the application is:
//   card: String 
//   cardValue: Array
//   cardShow: Array
//   ctr: Integer
//   display: String

const cards = ['FA0','AB0','BA0','HB0','CA0','DB0','DA0','CB0','EA0','EB0','AA0','FB0','GA0','GB0','HA0','BB0'];
const arr = ['','','','','','','','','','','','','','','','']
//--const timer = 1000;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    //defining skel structure for state
    this.state = {
       card: "###",
       cardValue: cards,
       cardShow: arr,
       ctr: 0,
       display: "display0"  
    };
    //establishing join
    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { 
                          console.log("Unable to join", resp)});
  }

  //setting new state of the game
  gotView(view) {
     this.setState(view.game);
  }
  
  //updates the layout of the game
  updateLayout(cardSelected) {
     let cardSel = ""+cardSelected;
     this.channel.push("updateLayout",{ c: cardSel})
                 .receive("ok",this.gotView.bind(this));
     this.channel.push("matchCard",{ c: cardSel })
                 .receive("ok",this.gotView.bind(this));
   }

  //restarts the game
  restartGame() { 
     this.channel.push("restartGame",{ }).receive("ok", this.gotView.bind(this));
  }  

//renders the layout
render() {
return(
<div id="layout" className="layout">
   <div className="ctr">
        You have clicked {this.state.ctr} times 
   </div>
   <br/>
   <div id={this.state.display}>
	<div className="row">
	<div className="col"><Card id ={0} root={this}/></div>
        <div className="col"><Card id ={1} root={this}/></div>
	<div className="col"><Card id ={2} root={this}/></div>
	<div className="col"><Card id ={3} root={this}/></div>
        </div><br/><br/>
	<div className="row">
	<div className="col"><Card id ={4} root={this}/></div>
	<div className="col"><Card id ={5} root={this}/></div>
	<div className="col"><Card id ={6} root={this}/></div>
	<div className="col"><Card id ={7} root={this}/></div>
        </div><br/><br/>
	<div className="row">
	<div className="col"><Card id ={8} root={this}/></div>
	<div className="col"><Card id ={9} root={this}/></div>
	<div className="col"><Card id ={10} root={this}/></div>
	<div className="col"><Card id ={11} root={this}/></div>
	</div><br/><br/>
	<div className="row">
	<div className="col"><Card id ={12} root={this}/></div>
	<div className="col"><Card id ={13} root={this}/></div>
	<div className="col"><Card id ={14} root={this}/></div>
	<div className="col"><Card id ={15} root={this}/></div>
	</div>
   </div>
   <br/>
   <div>
       <button className="restart" onClick={()=>this.restartGame()}>Restart Game
       </button>
   </div>
</div>);}
}

function Card(props) {
   //updates layout on basis of input event
   function matchCards(newEvent) { 
     props.root.updateLayout(newEvent.target.id);
   } 
   return (<button 
     className={"card card-picked cardState"+props.root.state.cardValue[props.id].charAt(2)}
     id={props.id}
     onClick={matchCards}>
     {props.root.state.cardShow[props.id]} 
     </button>);
}
