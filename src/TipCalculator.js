import React, { Component } from 'react';
import Results from './Results';
import Inputs from './Inputs';
import Buttons from './Buttons';
import QRCode from 'qrcode';


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
		this.updateTotalBill = this.updateTotalBill.bind(this);
		this.updateSplitCount = this.updateSplitCount.bind(this);
		this.getTipPercentage = this.getTipPercentage.bind(this);
		this.generateQR = this.generateQR.bind(this);
	}

	generateQR() {
		let str = this.state.billTotal;
		let str2 = this.state.tipTotal;


		const bill = `Your are about to pay $${str} + $${str2}. Pay Bill?`;

		QRCode.toCanvas(document.getElementById('canvas'), bill, 
		function(a) {
			// if (error) console.error(error)
			// console.log('success!')
			return a
		})
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

		if(this.state.clickedBtn === '.' && this.state.billTotal.includes('.')) {		
			return null;
		}  

		if(this.state.clickedBtn !== 'C') {
            newState = this.state.billTotal + this.state.clickedBtn;
			this.setState({
                billTotal: newState
			}, function() {
				this.calculateTotalAmount();
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
				qrcode: '',
			}, function() {
				this.calculateTotalAmount();
			});
		}
	}

	// This updates the Split Bill based on what the user selects ( -/+ )
	updateSplitCount(sum) {
		let newState;
		// Increment +1 when the user clicks the '+' icon and save this to setState()
		if(sum === 'add') {
			newState = this.state.numberOfPeople + 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
			this.calculateTotalAmount();
		});
		}
		// Decrement -1 when the user clicks the '-' icon if it is greater than 1 and save this to setState()
		else if(sum === 'minus' && this.state.numberOfPeople > 1) {
			newState = this.state.numberOfPeople - 1;
			this.setState({
				numberOfPeople: newState
			}, function() {
				this.calculateTotalAmount();
			});
		} else {
			this.setState({
				numberOfPeople: this.state.numberOfPeople
				}, function() {
				this.calculateTotalAmount();
			});
		}
	}

	// This gets the Tip Percentage that the user selects.
	getTipPercentage(i) {
        let newState = this.state.percentages[i];

		this.setState({
            tipPercent: newState
		}, function() {
			this.calculateTotalAmount();
		}
        ); 
	}

	// This calculates the new Total Bill
	calculateTotalAmount() {
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
				<canvas 
				style={{ bgColor: '#000000', float: 'right', marginBottom: '-149px', marginRight: '8%'}} 
				id="canvas" />
				<Results 
					costPerPerson={this.state.costPP} 
					billTotal={this.state.billTotal}
					tipTotal={this.state.tipTotal}
                    splitCount={this.state.numberOfPeople} />
				<Inputs 
					billTotal={this.state.billTotal} 
                    tipTotal={this.state.tipTotal}
					getSplitCount={this.updateSplitCount} 
					splitCount={this.state.numberOfPeople} 
					getTipPercentage={this.getTipPercentage}
					handleInputChange={this.handleInputChange} />
				<Buttons onClickBtn={this.onClickBtn} buttons={this.state.buttons} />
				<button style={{ bottom: '0', left: '0',  cursor: 'pointer', padding: '15px', marginTop: '-90px', backgroundColor: '#5CC116', marginBototm: '20px', fontSize:'22px', width: '100%' }} onClick={this.generateQR}>
					Pay Bill
				</button>
			</div>
		)
	}
}

export default TipCalculator;