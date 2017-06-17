import * as React from 'react';
import { connect } from 'react-redux'

import World from '../lib/World'
import Grid from "./Grid";


interface ILayoutProps { 

}

interface ILayoutState { 
	myWorld: World;
	grid: number[][];
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState>{

	constructor(props) {
		super(props);

		let myWorld = new World();
		
		this.state = {
			myWorld: myWorld, 
			grid: []
		};

	}

	componentDidMount(){
		this.setState({grid: this.state.myWorld.grid});
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

					<div style={{display:'inline-block', padding: '20px 0', width: '100%'}}>

						<div className="action-buttons-container">
							{/*<i className="fa fa-step-backward" onClick={this.onClickBack.bind(this)}></i>*/}
							<i className="fa fa-pause" onClick={this.onClickPause.bind(this)}></i>
							<i className="fa fa-play" onClick={this.onClickPlay.bind(this)}></i>
							{/*<i className="fa fa-step-forward" onClick={this.onClickForward.bind(this)}></i>*/}
						</div>

					</div>
				</div>

				<Grid world={this.state.myWorld} />

			</div>

		)
	}

}

