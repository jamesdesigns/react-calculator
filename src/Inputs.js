import React from 'react';
import { Component } from 'react';

// Create an array of the percentage amounts to be seen on the Tip Calculator screen
const tipPercentages = ['10%', '15%', '18%' , '20%'];

// Create a class component named Inputs and use this in the TipCalculator.js component
class Inputs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			keyInput: ''
		};
	}

	// This adds a white background over the selected Tip Percentage amount on the Tip Calculator screen
	handleStyleChange(i) {
		if(this.state.active === i) {
			return 'selected-tipPerc';
		} else {
			return '';
		}
	}

	// This sets the Tip Percentage selected and saves it in the setState
	handleTipSelect(i) {
		this.setState({ active: i });
        this.props.getTipPercentage(i)
	}

	// This will output and display all the new calculations for the Tip Total, Bill Amount, Split Bill, and Tip Percentage selected
	render() {
		return (
			<div style={{marginRight: '45px'}} className="inputs flex-col">
				<div style={{ paddingLeft: '6%'}} className="tip-total flex-col">
					<span>Tip Total </span>
					<span className="align-center">$ {this.props.tipTotal.toFixed(2)}</span>
				</div>	

				<div style={{ paddingLeft: '6%'}} className="bill-total flex-col">
					<span>Bill Amount</span>
					<input type="text" defaultValue={this.props.billTotal} onKeyPress={(e) => this.handleKeyPress(e)}  disabled />
				</div>

				<div style={{ paddingLeft: '0'}}  className="guest-count flex-row">
                	<div>Split Bill</div>
					<div onClick={() => this.props.getSplitCount('minus')}>
						<p className="icon ion-md-remove">-</p>
					</div>
					<div>
						<span>{this.props.splitCount} </span>
						<p className="icon ion-md-person"></p>
					</div>
					<div onClick={() => this.props.getSplitCount('add')}>
						<p className="icon ion-md-add">+</p>
					</div>
				</div>

				<div style={{ paddingLeft: '7%', paddingRigh: '7%'}}  className="tip-percent flex-col">
					<ul>
						{	// This returns the array of all the Tip Percentage options and displays all 4 selections
							tipPercentages.map((el, i) => (
								<li className={this.handleStyleChange(i)} key={el} onClick={() => this.handleTipSelect(i)}>
									{el}
								</li>
                            ))
						}
					</ul>
				</div>
			</div>
		)

	}
}
export default Inputs;