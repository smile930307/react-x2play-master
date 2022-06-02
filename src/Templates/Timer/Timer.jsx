import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = ({ time }) => {
	const lastBet = time * 1000;
	//const dateObject = new Date(lastBet);
	//	const humanDateFormat = dateObject.toLocaleString();

	// Getting the current moment
	let currentTime =
		new Date(lastBet + 30 * 24 * 60 * 60 * 1000).getTime() / 1000;

	console.log('Current', moment.unix(currentTime).format('MM/DD/YYYY'));

	// Adding a month to it
	//const futureMonthw = currentTime.add(1, 'M');

	//	console.log(futureMonthw);

	const t = moment.unix(time);
	const cc = moment(t);

	//const futureMonth = moment(cc).add(1, 'M');

	let gameEndDate = new Date(lastBet);
	let numberOfDaysToAdd = 30;
	gameEndDate.setDate(gameEndDate.getDate() + numberOfDaysToAdd);

	const calculateTimeLeft = () => {
		let year = new Date().getFullYear();
		const difference = new Date() - new Date();

		//	console.log('TIME', t, futureMonth);
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				дней: Math.floor(difference / (1000 * 60 * 60 * 24)),
				часа: Math.floor((difference / (1000 * 60 * 60)) % 24),
				минут: Math.floor((difference / 1000 / 60) % 60),
				секунд: Math.floor((difference / 1000) % 60),
			};
		} else {
			timeLeft = {
				дней: 0,
				часа: 0,
				минут: 0,
				секунд: 0,
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [year] = useState(new Date().getFullYear());

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	}, []);
	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		timerComponents.push(
			<div className='counter__col'>
				<span id='days' className='time'>
					{timeLeft[interval]}
				</span>
				<span className='label'>{interval}</span>
			</div>
		);
	});

	return (
		<div className='counter-wrap aboveGame'>
			<div className='counter'>
				{timerComponents.length ? (
					timerComponents
				) : (
					<span>Игра закончилась</span>
				)}
			</div>
			<div className='counter-wrap__label'>
				<span>ДО ЗАВЕРШЕНИЯ ИГРЫ</span>
			</div>
		</div>
	);
};
export default Timer;
