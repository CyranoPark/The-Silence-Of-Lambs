import React from 'react';

const Clock = ({ time }) => (
	<div className='play-time'>
		<div className='clock'>
			<p className='clock-title'>TIME</p>
			<p className='time'>{time}</p>
		</div>
	</div>
);

export default Clock;
