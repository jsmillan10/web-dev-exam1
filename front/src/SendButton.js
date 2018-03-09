import React, {Component} from "react";

export class SendButton extends Component{

	constructor(props){
		super(props);

    }
    
    handleClick()

	render(){
		return(
			<button type="button" onclick={this.handleClick}>Fight</button>
		);
	}
}