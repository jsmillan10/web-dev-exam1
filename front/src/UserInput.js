import React, {Component} from "react";

export class UserInput extends Component{

    constructor(props){
        super(props);
        this.handdleChange = this.handdleChange.bind(this);
    }

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