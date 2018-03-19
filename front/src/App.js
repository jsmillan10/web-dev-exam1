import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {UserInput} from "./UserInput";
import {User2Input} from "./User2Input";
import {Winner} from "./Winner";
import {History} from "./History";
import {MostLiked} from "./MostLiked";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstUser: "",
			secondUser: "",
			likes1: 0,
			likes2: 0,
			ganador: "",
			perdedor: "",
			winnerUsr: {},
			loserUsr: {},
			history: [],
			mostLiked: []
		};
		this.getFirstUser = this.getFirstUser.bind(this);
		this.getSecondUser = this.getSecondUser.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClickHistory = this.handleClickHistory.bind(this);
		this.handleClickMost = this.handleClickMost.bind(this);
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
		fetch("https://www.instagram.com/" + this.state.firstUser + "/?__a=1")
			.then( res => res.json())
			.then( d => {
				let n = 0;
				for(let i of d.graphql.user.edge_owner_to_timeline_media.edges){
					n += i.node.edge_liked_by.count;
				}
				return {number: n, user: d };
			})
			.then( usr => {
				fetch("https://www.instagram.com/" + this.state.secondUser + "/?__a=1")
					.then(r => r.json())
					.then(resJs => {
						let num = 0;
						for(let i of resJs.graphql.user.edge_owner_to_timeline_media.edges){
							num += i.node.edge_liked_by.count;
						}
						var theWinner = usr.number > num ? this.state.firstUser : this.state.secondUser;
						var theLoser = usr.number < num ? this.state.firstUser : this.state.secondUser;
						var usrWinner = theWinner === this.state.firstUser ? usr.user : resJs;
						var usrLoser = theLoser === this.state.firstUser ? usr.user : resJs;
						this.setState({
							likes1: usr.number,
							likes2: num,
							ganador: theWinner,
							perdedor: theLoser,
							winnerUsr: usrWinner,
							loserUsr: usrLoser
						}, () => {
							console.log(this.state);
							fetch("/fightResults", {
								method: "POST",
								headers: {
									"Content-Type": "application/json"},
								body: JSON.stringify({
									fighter1: this.state.firstUser,
									fighter2: this.state.secondUser,
									winner: this.state.ganador
								})
							});
						});
					});
			});
	}

	componentDidUpdate(prevProps, prevState){
		console.log(this.state.winnerUsr);
		if (this.state.winnerUsr !== prevState.winnerUsr) {
			let max = 0;
			let pic ="";
			for(let i of this.state.winnerUsr.graphql.user.edge_owner_to_timeline_media.edges){
				if(i.node.edge_liked_by.count > max){
					max = i.node.edge_liked_by.count;
					pic = i.node.thumbnail_src;
				}
			}
			fetch("/max", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"},
				body: JSON.stringify({
					user: this.state.ganador,
					likes: max,
					picture: pic
				})
			});
		}
		if(this.state.loserUsr !== prevState.loserUsr){
			let max = 0;
			let pic ="";
			for(let i of this.state.loserUsr.graphql.user.edge_owner_to_timeline_media.edges){
				if(i.node.edge_liked_by.count > max){
					max = i.node.edge_liked_by.count;
					pic = i.node.thumbnail_src;
				}
			}
			fetch("/max", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"},
				body: JSON.stringify({
					user: this.state.perdedor,
					likes: max,
					picture: pic
				})
			});
		}
	  }

	handleClickHistory(){
		fetch("/stats").then(res => res.json())
			.then(d => this.setState({history: d}));
	}

	handleClickMost(){
		fetch("/max").then(res => res.json())
			.then(d => this.setState({mostLiked: d}));
	}
	

	render() {
		console.log(this.state.mostLiked);
		return (
			<div>
				<div className="jumbotron">
					<h1 className="title"> Instagram Fight! </h1>
				</div>
				<div className="container">
					<div className="row">
						<UserInput onChange={this.getFirstUser} />
						<h3 className="vs">VS</h3>
						<User2Input onChange={this.getSecondUser} />
						<button type="button" onClick={this.handleClick} className="btn btn-danger">Fight</button>
					</div>
					<div className="row">
						{ this.state.ganador != "" ?  <Winner winner={this.state.ganador} profilePic={this.state.winnerUsr.graphql.user.profile_pic_url}/> : <div></div>}
					</div>
					<div className="row">
						<button type="button" onClick={this.handleClickHistory} className="btn btn-success">Show History</button>
						<button type="button" onClick={this.handleClickMost} className="btn btn-success">Show Most Liked Pic</button>
					</div>
					<div className="row">
						<div className="col-md-6">
							{this.state.history.length !== 0 ? <History matches={this.state.history}/> : <div></div>} 
						</div>
						<div className="col-md-6">
							{this.state.mostLiked.length !== 0 ? <MostLiked usr={this.state.mostLiked[0].user} likes={this.state.mostLiked[0].likes} pic={this.state.mostLiked[0].picture}/> : <div></div>} 
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
