import React from 'react';
import logo from './logo.svg';

const Results = (props) => {
	let tipTotal = parseFloat(props.tipTotal);
    let billTotal = parseFloat(props.billTotal);

	if (isNaN(billTotal)) {
		billTotal = '';
    }
    
	let partyCount = props.partyCount;
	return (
		<ul style={{ backgroundColor: '#181818', padding: '30px 30px 15px 26px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', marginTop: '10px'}} className="results flex-row">
			<li className="cost-pp flex-col">
                <img style={{ width: '80px', height: '80px', marginLeft: '78%', marginBottom: '-75px'}} src={logo} alt="QR Code" />
				<span>Total Bill</span>
				<span>$ {props.costPerPerson.toFixed(2)}</span>
			</li>
			<li className="col-2">
                <span>Split Bill by {partyCount}: </span>&nbsp;&nbsp;
				<span>Bill </span>
				<span>$</span><span>{(billTotal / partyCount).toFixed(2)}</span>
                <span>&nbsp; + &nbsp;</span>
                <span>Tip  </span>
				<span>$</span><span>{(tipTotal / partyCount).toFixed(2)}</span>
			</li>
		</ul>
	)
}

export default Results;