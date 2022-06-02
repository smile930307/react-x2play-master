import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withTagDefaultProps } from 'hoc';
import { withServiceConsumer } from 'services/Context';
import { Img } from 'templates/Img';
import { Progress, GameInfo } from 'templates/Game';
import { useSelector } from 'react-redux';
import { Web3Actions } from 'app/Actions';
import Constants from 'app/Constants';
import { toast } from 'react-toastify';
import Timer from 'templates/Timer';
import { useMediaQuery } from 'react-responsive';

const propTypes = {
	items: PropTypes.arrayOf(PropTypes.any).isRequired,
	sum: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	submitForm: PropTypes.func.isRequired,
};

const GameBlock = ({
	rate,
	users,
	items,
	sum,
	lastBet,
	onChange,
	submitForm,
	t,
	setIsGameWithdraw,
	withdrawable,
	setOpenWithdraw,
	setCCOBalance,
	setGameInfo,
	setMyGame,
	setWithdrawble,
	setOpenReinvest,
}) => {
	const [listItems, setListItems] = useState([]);
	const [listCount, setListCount] = useState(5);
	const walAddress = useSelector((state) => state.web3.address);
	const ccoBalance = useSelector((state) => state.web3.ccoBalance);
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const submit = (e) => {
		e.preventDefault();
		const maxAmount = parseFloat(ccoBalance);
		const requestedAmount = parseFloat(sum || 0) * 1_000_000;

		if (requestedAmount > maxAmount) {
			toast.error('Неверная сумма');
			return;
		}
		submitForm({
			sum,
			walAddress,
			setCCOBalance,
			setGameInfo,
			setMyGame,
			setWithdrawble,
		});
	};

	useEffect(() => {
		setListItems(items);
	}, [items]);

	const showMoreHandeler = () => {
		items = listItems.slice(0, listCount);
		setListCount(listCount + 5);
	};
	return (
		<div className='game'>
			<div className='game__head'>
				<div className='game__col'>
					<div className='game__title'>{t('Текущая X2 игра')}</div>
				</div>
				<div className='game__col'>
					<div className='buttons__additional'>
						<button
							type='button'
							className='game__head-btn'
							onClick={() => {
								setIsGameWithdraw(true);
								setOpenWithdraw(true);
							}}
						>
							{t('Вывести ССО')}
						</button>
						<button
							type='button'
							className='game__head-btn'
							onClick={() => {
								setOpenReinvest(true);
							}}
						>
							{t('Реинвестировать')}
						</button>
					</div>

					<div className='game__head-info'>
						<span>{t('Сумма вашего выигрыша:')}</span>
						<span className='game__head-count'>{withdrawable}</span>
					</div>
					{isMobile && <Timer time={lastBet} />}
				</div>
			</div>
			<div className='game__body'>
				<GameInfo rate={rate} users={users} lastBet={lastBet} />

				<div className='game__row'>
					<div
						className='game__content'
						style={{ backgroundImage: 'url(/assets/images/icons/game-bg.svg)' }}
					>
						<ul className='game__list'>
							{items.map(({ value, total, filled, type }, index) => {
								return (
									index < listCount && (
										<li key={`Progress-${index}`} className='game__item'>
											<Progress
												number={index + 1}
												value={value}
												total={total}
												filled={filled}
												type={type}
											/>
										</li>
									)
								);
							})}
						</ul>
						{items.length > 5 ? (
							<button
								className='game__collapse'
								onClick={() => showMoreHandeler()}
							>
								<Img src='/assets/images/icons/collapse.svg' alt='collapse' />
								<span>{t('Посмотреть все очереди')}</span>
							</button>
						) : null}
						<span className='game__hint'>
							Вы можете сделать ставку на ПК версии
						</span>
					</div>
					<div className='game__rate'>
						<form className='rate' onSubmit={submit}>
							<button type='submit' className='rate__button'>
								<Img src='/assets/images/icons/rate.svg' alt='rate' />
							</button>
							<div className='rate__title'>{t('Сделать ставку')}</div>
							<input
								className='rate__input'
								type='number'
								value={sum}
								onChange={(e) => onChange('sum', e.target.value)}
							/>
							<div className='rate__desc'>{t('Введите сумму ставки')}</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

GameBlock.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
	const { getStoreItem } = ownProps.service;
	return {
		rate: state.web3.gameInfo.bets,
		users: state.web3.gameInfo.players,
		items: state.web3.gameInfo.items || [],
		sum: getStoreItem(state, ['form', 'sum'], ''),
		withdrawable: state.web3.availableToWithdraw,
		lastBet: state.web3.lastBet,
	};
};

const mapDispatchToProps = (dispatch, { service: { getActionStore } }) => ({
	onChange: getActionStore('onChange')(dispatch),
	submitForm: getActionStore('submitForm')(dispatch),
	setCCOBalance: (balance) =>
		Web3Actions.setCCOBalance(
			dispatch({
				type: Constants.SET_CCO_BALANCE,
				data: { ccoBalance: balance },
			})
		),
	setGameInfo: (data) =>
		Web3Actions.setGameInfo(
			dispatch({ type: Constants.SET_GAME_INFO, data: { gameInfo: data } })
		),
	setMyGame: (data) =>
		Web3Actions.setMyGame(
			dispatch({ type: Constants.SET_MY_GAME, data: { myGame: data } })
		),
	setWithdrawble: (data) =>
		Web3Actions.setWithdrawble(
			dispatch({
				type: Constants.SET_WITHDRAWABLE,
				data: { availableToWithdraw: data },
			})
		),
	setLastBet: (data) =>
		Web3Actions.setLastBet(
			dispatch({
				type: Constants.SET_LAST_BET,
				data: { lastBet: data },
			})
		),
});

export default compose(
	withServiceConsumer,
	withTagDefaultProps(mapStateToProps, mapDispatchToProps)
)(GameBlock);
