import React, {Component} from "react";

export class Winner extends Component{

	render(){
		return(
			<div>
				<h1>The winner is {this.props.winner}!</h1>
				<img src={this.props.profilePic}  alt="winner profile pic"/>
				<img className="applauseGif" src="https://media.giphy.com/media/NnGGHE0muVqpO/giphy.gif" alt= "app"/>
			</div>
		);
	}
}