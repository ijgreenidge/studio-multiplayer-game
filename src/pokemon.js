import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import pokeStyle from './pokeStyle.css'
import firebase from 'firebase'


const style = {
    margin: 12,
};

export default class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOneName: "", //this.state.playerOneName
            playerOneHealth: 0,
            playerOneTrainer: "",
            playerTwoName: "",
            playerTwoHealth: 0,
            playerTwoTrainer: "",
        };
        this.playerData = firebase.database().ref('/playerData');
        // TODO #1 update the state when the Firebase items updates.

        this.playerData.on("value", (snapshot) => {
            var playerData = snapshot.val();
            console.log(playerData);
            this.setState({
                playerOneName: playerData.playerOneName,
                playerOneHealth: playerData.playerOneHealth,
                playerOneTrainer: playerData.playerOneTrainer,
                playerTwoName: playerData.playerTwoName,
                playerTwoHealth: playerData.playerTwoHealth,
                playerTwoTrainer: playerData.playerTwoTrainer,

            });
        });

    }

    playerOneAttack() {
        this.playerData.update({ playerTwoHealth: this.state.playerTwoHealth - 50 });
    }

    playerTwoAttack() {
        this.playerData.update({ playerOneHealth: this.state.playerOneHealth - 50 });
    }
    render() {   
        return (
            <div className="shopping-list">
                <h1 id="mainTitle">Player1 vs Player2</h1>
        
                <div className="playerOne">
                    <img src="" />
                    <h2 className="playerOneName"> {this.state.playerOneName}</h2>
                    <h2 classname="playerOneHealth">{this.state.playerOneHealth}</h2>
                    <RaisedButton onClick={this.playerOneAttack.bind(this)} label="Default" style={style} />
                    
                </div>
              
                <div className="playerTwo">
                   <img src="" />
                   <h2 className="playerTwoName">{this.state.playerTwoName}</h2>
                    <h2 classname="playerTwoHealth">{this.state.playerTwoHealth}</h2>
                   <RaisedButton onClick={this.playerTwoAttack.bind(this)} label="Default" style={style} />
                   
                </div>
                
              </div>

        );
    }
}
