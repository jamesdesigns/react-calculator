import React from 'react';

const Results = (props) => {
	let tipTotal = parseFloat(props.tipTotal);
    let billTotal = parseFloat(props.billTotal);
    // let ratings = props.ratings;
	if (isNaN(billTotal)) {
		billTotal = '';
	}
	let partyCount = props.partyCount;
	return (
		<ul style={{ backgroundColor: '#181818', padding: '50px 25px 25px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', marginTop: '1px'}} className="results flex-row">
			<li className="cost-pp flex-col">
				<span>Total Bill</span>
				<span>$ {props.costPerPerson.toFixed(2)}</span>
                {/* <span style={{textAlign: 'right', marginTop: '-55px'}}>{ratings}</span> */}
			</li>
			<li className="col-2">
                <span>Split Bill by {partyCount}: </span>&nbsp;&nbsp;
				<span>Bill </span>
				<span>$</span><span>{(billTotal / partyCount).toFixed(2)}</span>
                <span>&nbsp; + &nbsp;</span>
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