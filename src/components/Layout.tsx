import * as React from 'react';

import WorldContainer from "./WorldContainer";


export interface LayoutProps { }

export default class Layout extends React.Component<LayoutProps, undefined>{

	render(){
		return (
			<WorldContainer />
		)
	}

}
