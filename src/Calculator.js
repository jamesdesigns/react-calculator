import React, { Component } from 'react';

import Results from './Results';
import Inputs from './Inputs';
import Buttons from './Buttons';
const btnsValue = [7,8,9,4,5,6,1,2,3,'.',0,'C'];
const tipPercentages = [.10, .15, .18, .20];
const emoji = ['😐','😏','😊','😃'];

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttons: btnsValue,
			clickedBtn: '',
			billTotal: '',
			numberOfPeople: 1,
			percentages: tipPercentages,
            // tipPercent: tipPercentages[0],
            ratings: emoji,
			tipTotal: 0,
			costPP: 0
		};

		this.onClickButton = this.onClickButton.bind(this);
		this.updateBillTotal = this.updateBillTotal.bind(this);
		this.updatePartyCount = this.updatePartyCount.bind(this);
		this.getTipPercentage = this.getTipPercentage.bind(this);
	}

	onClickButton(i) {			
		this.setState({
			clickedBtn: this.state.buttons[i]
		}, function() {
			this.updateBillTotal(i);
		});	
	}

	updateBillTotal(i) {
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
		} else{
			newState = '';
			this.setState({
				billTotal: newState,
				numberOfPeople: 1,
                tipTotal: 0,
				costPP: 0
			}, function() {
				this.calculateCosts();
			});
		}
	}


	updatePartyCount(sum) {
		let newState;
		if(sum === 'add') {
			newState = this.state.numberOfPeople + 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
			this.calculateCosts();
		});
		} else if(sum === 'minus' && this.state.numberOfPeople > 1) {
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

	getTipPercentage(i) {
        let newState = this.state.percentages[i];
        let newRating = this.state.ratings[i];
        console.log(newState);
        console.log(newRating);
		this.setState({
            tipPercent: newState,
            selectEmoji: newRating
		}, function() {
			this.calculateCosts();
		}
        ); 
	}

	calculateCosts() {
		let newBillTotal = parseFloat(this.state.billTotal);
		if(!Number.isNaN(newBillTotal)) {
			let newTipTotal, newCostPP, newRating; // newRatings
            newTipTotal = parseFloat(newBillTotal * this.state.tipPercent);
            newRating = this.state.selectEmoji; // newRatings
			newCostPP = newBillTotal + newTipTotal; 
			newCostPP = newCostPP / this.state.numberOfPeople;
	    this.setState({
			tipTotal: newTipTotal,
            costPP: newCostPP,
            ratings: newRating
		});
		}
	}

	render() {
		return (
			<div>
				<Results 
					costPerPerson={this.state.costPP} 
					billTotal={this.state.billTotal}
					tipTotal={this.state.tipTotal}
                    partyCount={this.state.numberOfPeople}
                    ratings={this.state.ratings} />
					<Inputs 
					billTotal={this.state.billTotal} 
                    tipTotal={this.state.tipTotal}
                    ratings={this.state}
					getPartyCount={this.updatePartyCount} 
					partyCount={this.state.numberOfPeople} 
					getTipPercentage={this.getTipPercentage}
					handleInputChange={this.handleInputChange} />
				<Buttons onClickButton={this.onClickButton} buttons={this.state.buttons} />
			</div>
		)
	}
}

export default Calculator;