import React,{Component} from "react";

export class MostLiked extends Component{

	render(){
		return(
			<div>
				<h3>User: {this.props.usr}</h3>
				<h4>Likes: {this.props.likes}</h4>
				<img src={this.props.pic} alt="most liked pic"/>
			</div>
		);
	}
}