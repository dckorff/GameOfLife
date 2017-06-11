import * as React from 'react';

export interface GridFormProps { }

export default class GridForm extends React.Component<GridFormProps, undefined>{

	constructor(props) {
		super(props);
	}

	onChangeGridSize(event){
		console.log(event);
	}

	render(){
		console.log("render");	
		return (


			<div className="grid-form-container">

				<label>Grid Size</label>
				<input type="text" onChange={this.onChangeGridSize.bind(this)} />

				{/*
					speed (frames/second)					
				*/}

			</div>
		)
	}

}