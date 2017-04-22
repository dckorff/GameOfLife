import * as React from 'react';

export interface GridProps { }

export default class Grid extends React.Component<GridProps, undefined>{

	constructor(props) {
		super(props);

		this.state = {grid: []};
	}

	componentDidMount() {

		this.props.world.addOnNewGrid(this.onNewGrid.bind(this));		
		this.setState({grid: this.props.world.grid});
	}

	onNewGrid(){
		this.setState({grid: this.props.world.grid});
		// this.render();
	}

	render(){
		console.log("render");	
		console.log("grid props")
		console.log(this.props);
		return (
			<div style={{display: 'inline-block', width: 'calc(100vw - 250px)'}}>

				<div className="world-container">
					{this.props.world.grid.map( (row, iRow) => { 
							return ( 
								<div className="row" key={iRow}>
									{row.map( (col, iCol) => {
										return (<div className={"cell" + (col == 1 ? " on" : "")} key={iCol}></div>)
									})}
								</div> 
							)
						})}
					
				</div>
			{/*
				<br /><br /><br />

				<table>
					<tbody>
						{this.state.grid.map( (row, iRow) => { 
							return ( 
								<tr key={iRow}>
									{row.map( (col, iCol) => {
										return (<td key={iCol}>{col}</td>)
									})}
								</tr> 
							)
						})}
					</tbody>
				</table>

				<br />

				{this.state.myWorld.newGrids.length}
				<br />
				{this.state.myWorld.newGrids.map( (newGrid, newGridIndex) => {
					return (
						<table key={newGridIndex} >						
							<tbody>
								{newGrid.map( (row, iRow) => { 
									return ( 
										<tr key={iRow}>
											{row.map( (col, iCol) => {
												return (<td key={iCol}>{col}</td>)
											})}
										</tr> 
									)
								})}
							</tbody>
						</table>
					)
				})}
				*/}
			</div>
		)
	}

}