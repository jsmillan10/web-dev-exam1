import React, {Component} from "react";

export class TableRow extends Component{

	render(){
		return(
			<tr>
				<td>{this.props.fighter1}</td>
				<td>{this.props.fighter2}</td>
				<td>{this.props.winner}</td>
			</tr>
		)
	}
}