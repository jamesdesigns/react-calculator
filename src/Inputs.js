import React from 'react';
import { Component } from 'react';

const tipPercentages = ['10%', '15%', '18%' , '20%'];
// const emoji = ['😐','😏','😊','😃'];

class Inputs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			keyInput: ''
		};
	}

	handleStyleChange(i) {
		if(this.state.active === i) {
			return 'selected-tipPerc';
		} else {
			return '';
		}
	}

	handleTipSelect(i) {
		this.setState({ active: i });
        this.props.getTipPercentage(i)
	}

	render() {
		return (
			<div style={{marginRight: '45px'}} className="inputs flex-col">
                    <div style={{ paddingLeft: '48px'}} className="tip-total flex-col">
                        <span>Tip Total </span>
                        <span className="align-center">$ {this.props.tipTotal.toFixed(2)}</span>
                    </div>	
                    <div style={{ paddingLeft: '48px'}} className="bill-total flex-col">
                        <span>Bill Amount</span>
                        <input type="text" defaultValue={this.props.billTotal} onKeyPress={(e) => this.handleKeyPress(e)}  disabled />
                    </div>
				<div style={{ paddingLeft: '0'}}  className="guest-count flex-row">
                <div>Split Bill</div>
					<div onClick={() => this.props.getPartyCount('minus')}>
						<p className="icon ion-md-remove">-</p>
					</div>
					<div>
						<span>{this.props.partyCount} </span>
						<p className="icon ion-md-person"></p>
					</div>
					<div onClick={() => this.props.getPartyCount('add')}>
						<p className="icon ion-md-add">+</p>
					</div>
				</div>
				<div style={{ paddingLeft: '48px'}}  className="tip-percent flex-col">
					<ul>
						{
							tipPercentages.map((el, i) => (
								<li className={this.handleStyleChange(i)} key={el} onClick={() => this.handleTipSelect(i)}>
									{el}
								</li>
                            ))
						}
					</ul>
                    {/* <div style={{ backgroundColor: 'transparent', fontSize: '45px'}}  className="flex-row">
                        {
							emoji.map((el, i) => (
								<p className={this.handleStyleChange(i)} key={el} onClick={() => this.handleTipSelect(i)}>
									{el}
								</p>
							))
						}  
                    </div>	 */}
				</div>

			</div>
		)

	}
}
export default Inputs;