import React, {Component} from "react";
import {TableRow} from "./TableRow";

export class History extends Component{

	render(){
		return(
			<table className="table table-striped table-dark">
				<thead>
					<tr>
						<th scope="col">Fighter1</th>
						<th scope="col">Fighter2</th>
						<th scope="col">Winner</th>
					</tr>
				</thead>
				<tbody>
					{this.props.matches.map((d, index) => {
						return(
							<TableRow fighter1={d.fighter1} fighter2={d.fighter2} winner={d.winner} key={index}/>
						);
					})}
				</tbody>
			</table>
		);
	}
}