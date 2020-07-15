import React from 'react';

const Results = (props) => {
	let tipTotal = parseFloat(props.tipTotal);
	let billTotal = parseFloat(props.billTotal
		);
	if (isNaN(billTotal)) {
		billTotal = '';
	}
	let partyCount = props.partyCount;
	return (
		<ul className="results flex-row">
			<li className="cost-pp flex-col">
				<span>Total Bill</span>
				<span>$ {props.costPerPerson.toFixed(2)}</span>
			</li>
			<li className="col-2">
				<span>Total </span>
				<span>$</span><span>{(billTotal / partyCount).toFixed(2)}</span>
                <span>&nbsp; / &nbsp;</span>
                <span>Tip  </span>
				<span>$</span><span>{(tipTotal / partyCount).toFixed(2)}</span>
			</li>
			{/* <li className="col-3">
				<span>Tip  </span>
				<span>$ </span><span>{(tipTotal / partyCount).toFixed(2)}</span>
			</li> */}
		</ul>
	)
}

export default Results;