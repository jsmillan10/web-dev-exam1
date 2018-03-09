import React, {Component} from "react";

export class UserInput extends Component{

	constructor(props){
		super(props);
		this.handleCahnge = this.handleCahnge.bind(this);
	}

	handleCahnge(e){
		var name = e.target.value;
		console.log(name);
		this.props.onChange(name);
	}

	render(){
		return(
			<input type="text" onChange={this.handleCahnge} />
		);
	}
}