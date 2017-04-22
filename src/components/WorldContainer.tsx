import * as React from 'react';
import { connect } from 'react-redux'

import World from '../lib/World'
import Grid from "./Grid";
import GridForm from "./GridForm";

export interface WorldContainerProps { }

export default class WorldContainer extends React.Component<WorldContainerProps, undefined>{

	constructor(props) {
		super(props);

		let myWorld = new World();
		
		this.state = {myWorld: myWorld, grid: []};

	}

	componentDidMount(){

		this.setState({grid: this.state.myWorld.grid});

		// this.state.myWorld.getNextState();

		// let me = this;
		// setInterval( 
		// 	function(){
		// 		// me.setState({
		// 		// 	myWorld: myWorld.getNextState()
		// 		// })				
		// 		myWorld.getNextState();
		// 		me.setState({grid: myWorld.grid});
		// 		// me.render();
		// 	},
		// 	1000	
		// );

	}

	onSetWorldProperties(worldProperties){}

	onClickPlay(){
		this.state.myWorld.play();
	}

	onClickPause(){
		this.state.myWorld.stop();
	}

	onClickBack(){}
	onClickForward(){}

	render(){
	
		return (

			<div>

				<div style={{display:'inline-block', height: '100%', verticalAlign: 'top', backgroundColor: 'rebeccapurple', width: '250px'}}>

					<div style={{display:'inline-block', padding: '20px'}}>

						<div className="action-buttons-container">
							<i className="fa fa-step-backward" onClick={this.onClickBack.bind(this)}></i>
							
							{/*
								(this.state.myWorld.isPlaying()) 
									? <i className="fa fa-pause" onClick={this.onClickPause.bind(this)}></i>
									: <i className="fa fa-play" onClick={this.onClickPlay.bind(this)}></i>
							*/}
							<i className="fa fa-pause" onClick={this.onClickPause.bind(this)}></i>
							<i className="fa fa-play" onClick={this.onClickPlay.bind(this)}></i>
							<i className="fa fa-step-forward" onClick={this.onClickForward.bind(this)}></i>
						</div>

						<GridForm world={this.state.myWorld} setWorldProperties={this.onSetWorldProperties.bind(this)} />

					</div>
				</div>

				<Grid world={this.state.myWorld} />

			</div>

		)
	}

}

// const mapStateToProps = (state, ownProps) => {
// 	console.log('state')
// 	console.log(state)
//   return {
//     grid: state.myWorld.grid
//   }
// }
// export default connect(mapStateToProps)(WorldContainer);
