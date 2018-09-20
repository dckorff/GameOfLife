import * as React from 'react';
import World from '../lib/World';

interface IGridProps {
	world: World;
}

interface IGridState {
	grid: number[][];
}

export default class Grid extends React.Component<IGridProps, IGridState>{

	constructor(props) {
		super(props);
		this.state = {
			grid: []
		};
	}

	componentDidMount() {
		this.props.world.addOnNewGrid(this.onNewGrid.bind(this));
		this.setState({grid: this.props.world.grid});
	}

	onNewGrid(){
		this.setState({grid: this.props.world.grid});
	}

	render(){
		return (
            <div className="world-container">
                {this.props.world.grid.map( (row, iRow) => (
                        <div className="row" key={iRow}>
                            {row.map( (col, iCol) => {
                                return (<div className={"cell" + (col == 1 ? " on" : "")} key={iCol}></div>)
                            })}
                        </div>
                    ))
                }
            </div>
		)
	}

}