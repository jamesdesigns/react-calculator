import React from 'react';

const Buttons = (props) => {
	return (
		<ul className="flex-row keypad">
			{props.buttons.map((btn,i) => {
				return (
					<li key={`btn-${i}`}>
						<button onClick={e => props.onClickBtn(i)}><span style={{margin: '0 auto', border: 'none'}}>{btn}</span></button>
					</li>
				)
			})}
		</ul>
	);
}

export default Buttons;