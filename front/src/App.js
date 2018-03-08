import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {UserInput} from "./UserInput";
import {User2Input} from "./User2Input";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstUser: "",
			secondUser: ""
    };
    this.getFirstUser = this.getFirstUser.bind(this);
    this.getSecondUser = this.getSecondUser.bind(this);
	}

	getFirstUser(userName){
		this.setState({
			firstUser: userName
		});
	}
  
	getSecondUser(usrN){
		this.setState({
			secondUser: usrN
		});
  }
  
  handleClick(){
    fetch("/"+this.state.firstUser+"/"+this.state.secondUser)
    .then(res => res.json())
    .then(a => console.log(a));
  }

	render() {
		return (
			<div>
				<h1> Instagram Fight! </h1>
				<UserInput onChange={this.getFirstUser} />
        <User2Input onChange={this.getSecondUser} />
        <button type="button" onclick={this.handleClick}>Fight</button>
			</div>
		);
	}
}

export default App;
