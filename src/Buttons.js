import React from 'react';

const Buttons = (props) => {
	return (
		<ul style={{ paddingLeft: '20px'}}  className="flex-row keypad">
			{props.buttons.map((btn,i) => {
				return (
					<li style={{ textAlign: 'center'}} key={`btn-${i}`}>
						<button onClick={e => props.onClickButton(i)}>{btn}</button>
					</li>
				)
			})}
		</ul>
	);
}

export default Buttons;