import React from 'react';

const PlayerCard = ({ id, x, y, color, score }) => (
	<div className="player-card" style={{backgroundColor: color}}>
		<span className="player-card__id">Name: {id}</span>
		<div className="player-card__coordinates">
			<span className="player-card__x">({x},</span>
			<span className="player-card__y">{y})</span>
		</div>
		<span className="player-card__score">Score: {score}</span>
	</div>
);

export default PlayerCard;