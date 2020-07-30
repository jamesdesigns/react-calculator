import React, { Component } from 'react';
import Results from './Results';
import Inputs from './Inputs';
import Buttons from './Buttons';

// Declare Button Values for the TipCalculator and Tip Percentage Values
const btnValues = [7,8,9,4,5,6,1,2,3,'.',0,'C'];
const tipPercentages = [.10, .15, .18, .20];

// Create a class component named TipCalculator and use this in the App.js component
class TipCalculator extends Component {
	constructor(props) {
		super(props);
		// These represent the rendered values
		this.state = {
			buttons: btnValues,
			clickedBtn: '',
			billTotal: '',
			numberOfPeople: 1,
			percentages: tipPercentages,
			tipTotal: 0,
			costPP: 0
		};

		// Binding is necessary to make `this` work in the callback
		this.onClickBtn = this.onClickBtn.bind(this);
		this.updatebillTotal = this.updatebillTotal.bind(this);
		this.updatePartyCount = this.updatePartyCount.bind(this);
		this.getTipPercentage = this.getTipPercentage.bind(this);
	}

	onClickBtn(i) {	
		// This updates to the components state object		
		this.setState({
			clickedBtn: this.state.buttons[i]
		}, function() {
			this.updatebillTotal(i);
		});	
	}

	// This function updates if the user enters a Bill Amount and can also Clear out the total if the user clicks 'C' 
	updatebillTotal(i) {
        let newState;

		if(this.state.clickedBtn === '.' && this.state.billTotal.includes('.')) {		
			return null;
		}  

		if(this.state.clickedBtn !== 'C') {
            newState = this.state.billTotal + this.state.clickedBtn;
			this.setState({
                billTotal: newState
			}, function() {
				this.calculateCosts();
			}
			);
		} else {
            newState = '';
			// This clears out everything when the user clicks the Clear(C) button
			this.setState({
				billTotal: newState,
				numberOfPeople: 1,
                tipTotal: 0,
                costPP: 0,
			}, function() {
				this.calculateCosts();
			});
		}
	}

	// This updates the Split Bill based on what the user selects ( -/+ )
	updatePartyCount(sum) {
		let newState;
		// Increment +1 when the user clicks the '+' icon and save this to setState()
		if(sum === 'add') {
			newState = this.state.numberOfPeople + 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
			this.calculateCosts();
		});
		}
		// Decrement -1 when the user clicks the '-' icon if it is greater than 1 and save this to setState()
		else if(sum === 'minus' && this.state.numberOfPeople > 1) {
			newState = this.state.numberOfPeople - 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
				this.calculateCosts();
			});
		} else {
			this.setState({
				numberOfPeople: this.state.numberOfPeople
				}, function() {
				this.calculateCosts();
			});
		}
	}

	// This gets the Tip Percentage that the user selects.
	getTipPercentage(i) {
        let newState = this.state.percentages[i];

		this.setState({
            tipPercent: newState
		}, function() {
			this.calculateCosts();
		}
        ); 
	}

	// This calculates the new Total Bill
	calculateCosts() {
		let newBillTotal = parseFloat(this.state.billTotal);
		if(!Number.isNaN(newBillTotal)) {
			// Declare variables for the new tip total and the new cost for each person
			let newTipTotal, newCostPP;
            newTipTotal = parseFloat(newBillTotal * this.state.tipPercent);
            if(!newTipTotal) {
				//  It is set to a default of .10 percent if the user does not click a percentage amount
                newTipTotal = parseFloat(newBillTotal * .10);
            }

			newCostPP = newBillTotal + newTipTotal; 
			newCostPP = newCostPP / this.state.numberOfPeople;

	    this.setState({
			tipTotal: newTipTotal,
            costPP: newCostPP
		});
		}
	}
	
	// This renders out all the new results from the user's input that they selected with the buttons in which they entered.
	render() {
		return (
			<div>
				<Results 
					costPerPerson={this.state.costPP} 
					billTotal={this.state.billTotal}
					tipTotal={this.state.tipTotal}
                    partyCount={this.state.numberOfPeople} />
				<Inputs 
					billTotal={this.state.billTotal} 
                    tipTotal={this.state.tipTotal}
					getPartyCount={this.updatePartyCount} 
					partyCount={this.state.numberOfPeople} 
					getTipPercentage={this.getTipPercentage}
					handleInputChange={this.handleInputChange} />
				<Buttons onClickBtn={this.onClickBtn} buttons={this.state.buttons} />
			</div>
		)
	}
}

export default TipCalculator;