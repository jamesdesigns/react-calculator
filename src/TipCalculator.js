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
			totalBill: '',
			numberOfPeople: 1,
			percentages: tipPercentages,
			tipTotal: 0,
			costForEachPerson: 0
		};

		// Binding is necessary to make `this` work in the callback
		this.onClickBtn = this.onClickBtn.bind(this);
		this.updateTotalBill = this.updateTotalBill.bind(this);
		this.updateSplitBill = this.updateSplitBill.bind(this);
		this.getTipPercentage = this.getTipPercentage.bind(this);
	}

	onClickBtn(i) {	
		// This updates to the components state object		
		this.setState({
			clickedBtn: this.state.buttons[i]
		}, function() {
			this.updateTotalBill(i);
		});	
	}

	// This function updates if the user enters a Bill Amount and can also Clear out the total if the user clicks 'C' 
	updateTotalBill(i) {
        let newState;

		if(this.state.clickedBtn === '.' && this.state.totalBill.includes('.')) {		
			return null;
		}  

		if(this.state.clickedBtn !== 'C') {
            newState = this.state.totalBill + this.state.clickedBtn;
			this.setState({
                totalBill: newState
			}, function() {
				this.calculateBill();
			}
			);
		} else {
            newState = '';
			// This clears out everything when the user clicks the Clear(C) button
			this.setState({
				totalBill: newState,
				numberOfPeople: 1,
                tipTotal: 0,
                costForEachPerson: 0,
			}, function() {
				this.calculateBill();
			});
		}
	}

	// This updates the Split Bill based on what the user selects ( -/+ )
	updateSplitBill(sum) {
		let newState;
		// Increment +1 when the user clicks the '+' icon and save this to setState()
		if(sum === 'add') {
			newState = this.state.numberOfPeople + 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
			this.calculateBill();
		});
		}
		// Decrement -1 when the user clicks the '-' icon if it is greater than 1 and save this to setState()
		else if(sum === 'minus' && this.state.numberOfPeople > 1) {
			newState = this.state.numberOfPeople - 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
				this.calculateBill();
			});
		} else {
			this.setState({
				numberOfPeople: this.state.numberOfPeople
				}, function() {
				this.calculateBill();
			});
		}
	}

	// This gets the Tip Percentage that the user selects.
	getTipPercentage(i) {
        let newState = this.state.percentages[i];

		this.setState({
            tipPercent: newState
		}, function() {
			this.calculateBill();
		}
        ); 
	}

	// This calculates the new Total Bill
	calculateBill() {
		let newtotalBill = parseFloat(this.state.totalBill);
		if(!Number.isNaN(newtotalBill)) {
			// Declare variables for the new tip total and the new cost for each person
			let newTipTotal, newCostForEachPerson;
            newTipTotal = parseFloat(newtotalBill * this.state.tipPercent);
            if(!newTipTotal) {
				//  It is set to a default of .10 percent if the user does not click a percentage amount
                newTipTotal = parseFloat(newtotalBill * .10);
            }

			newCostForEachPerson = newtotalBill + newTipTotal; 
			newCostForEachPerson = newCostForEachPerson / this.state.numberOfPeople;

	    this.setState({
			tipTotal: newTipTotal,
            costForEachPerson: newCostForEachPerson
		});
		}
	}
	
	// This renders out all the new results from the user's input that they selected with the buttons in which they entered.
	render() {
		return (
			<div>
				<Results 
					costPerPerson={this.state.costForEachPerson} 
					totalBill={this.state.totalBill}
					tipTotal={this.state.tipTotal}
                    splitCount={this.state.numberOfPeople} />
				<Inputs 
					totalBill={this.state.totalBill} 
                    tipTotal={this.state.tipTotal}
					getSplitAmount={this.updateSplitBill} 
					splitCount={this.state.numberOfPeople} 
					getTipPercentage={this.getTipPercentage}
					handleInputChange={this.handleInputChange} />
				<Buttons onClickBtn={this.onClickBtn} buttons={this.state.buttons} />
			</div>
		)
	}
}

export default TipCalculator;