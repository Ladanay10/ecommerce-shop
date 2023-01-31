import React, { useEffect, useState } from 'react';
import './clock.scss';

export const Clock = () => {

	const [days, setDays] = useState();
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [second, setSecond] = useState();
	let interval;

	const countDown = () => {
		const destination = new Date('Jun 10, 2023').getTime();
		interval = setInterval(() => {
			const now = new Date().getTime();
			const different = destination - now;
			const days = Math.floor(different / (1000 * 60 * 60 * 24))
			const hours = Math.floor(different % (1000 * 60 * 60 * 24) /
				(1000 * 60 * 60))
			const minutes = Math.floor(different % (1000 * 60 * 60) /
				(1000 * 60))
			const seconds = Math.floor(different % (1000 * 60) / (1000))
			if (destination < 0) clearInterval(interval.current)
			else {
				setDays(days)
				setHours(hours)
				setMinutes(minutes)
				setSecond(seconds)
			}
		})
	}
	useEffect(() => {
		countDown()
	}, [])
	return (
		<div className="clock__wrapper">
			<div className="clock__data">
				<div>
					<h1>{days}</h1>
					<h5>Days</h5>
				</div>
				<span>:</span>
			</div>
			<div className="clock__data">
				<div>
					<h1>{hours}</h1>
					<h5>Hours</h5>
				</div>
				<span>:</span>
			</div>
			<div className="clock__data">
				<div>
					<h1>{minutes}</h1>
					<h5>Minutes</h5>
				</div>
				<span>:</span>
			</div>
			<div className="clock__data">
				<div>
					<h1>{second}</h1>
					<h5>Second</h5>
				</div>
			</div>
		</div>
	)
}
