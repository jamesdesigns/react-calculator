import React from 'react';

const Buttons = (props) => {
	return (
		<ul className="flex-row keypad">
			{props.buttons.map((btn,i) => {
				return (
					<li key={`btn-${i}`}>
						<button style={{margin: '0 auto'}} onClick={e => props.onClickButton(i)}>{btn}</button>
					</li>
				)
			})}
		</ul>
	);
}

export default Buttons;