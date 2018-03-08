import React, {Component} from "react";

export class User2Input extends Component{

    handdleChange(e){
        var name = e.target.value;
        this.props.onChange(name);
    }

    render(){
        return(
            <input type="text" onChange={this.handleCahnge} />
        )
    }
}