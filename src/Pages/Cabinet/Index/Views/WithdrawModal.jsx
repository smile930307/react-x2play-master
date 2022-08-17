/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
	topUpCCO,
	withdrawCCO,
	getUsdtBalance,
	getCcoBalance,
	reInvest,
	gameWithdraw,
} from 'services/Web3';
import { Button } from 'templates/Button';
import { ReactModal } from 'templates/ReactModal';
import { Web3Actions } from 'app/Actions';
import Constants from 'app/Constants';
import { toast } from 'react-toastify';

const WithdrawModal = ({
	openTopUp,
	value,
	openWithdraw,
	referrer,
	setValue,
	closeModal,
	t,
	address,
	allowed,
	balanceOf,
	setOpenApprove,
	setCCOBalance,
	openReinvest,
	setWithdrawble,
	isGameWithdraw,
}) => {
	const [maximum, setMaximum] = useState(0);
	const getReAdd = useSelector((state) => state.web3.refId);
	const getWithdrawable = useSelector(
		(state) => state.web3.availableToWithdraw
	);

	useEffect(() => {
		if (openTopUp) getUsdtBalance(address, setMaximum);
		// setMaximum(allowed)
		else if (openWithdraw && isGameWithdraw) {
			setValue(getWithdrawable);
		} else if (openWithdraw)
			// setMaximum(balanceOf)
			getCcoBalance(address, setMaximum);
		else if (openReinvest) {
			setValue(getWithdrawable);
		}
	}, [openTopUp, openWithdraw, openReinvest, allowed, balanceOf]);

	const submitForm = () => {
		// const maxAmount = parseFloat(maximum);
		// if (
		// 	(openTopUp && value > maxAmount) ||
		// 	(openWithdraw && value > maxAmount)
		// ) {
		// 	toast.error('Неверная сумма');
		// 	return;
		// }
		if (openTopUp) {
			topUpCCO(address, value, referrer, closeModal, setCCOBalance, getReAdd);
		} else if (openWithdraw && isGameWithdraw) {
			gameWithdraw(address, value, closeModal, setCCOBalance, setWithdrawble);
		} else if (openWithdraw) {
			withdrawCCO(address, value, referrer, closeModal, setCCOBalance);
		} else if (openReinvest) {
			reInvest(address, value, closeModal, setCCOBalance, setWithdrawble);
		}
	};

	return (
		<ReactModal
			isOpen={openTopUp || openWithdraw || openReinvest}
			onRequestClose={closeModal}
			title='Top up'
		>
			<div
				className='balance-card transaction-card'
				style={{
					backgroundImage: 'url("/assets/images/content/balance-card-bg.svg")',
					width: 420,
				}}
			>
				<div className='balance-card__row'>
					<div className='balance-card__title'>
						{openTopUp
							? t('Пополнить')
							: openWithdraw
							? t('Вывести')
							: openReinvest
							? t('РЕИНВЕСТИРОВАТЬ')
							: ''}
					</div>
				</div>
				<div className='balance-card__row' style={{ marginBottom: '1rem' }}>
					<div className='balance-card__col'>
						<input
							className='rate__input'
							type='number'
							placeholder={
								openTopUp
									? t('Пополнить')
									: openWithdraw
									? t('Вывести')
									: openReinvest
									? t('РЕИНВЕСТИРОВАТЬ')
									: ''
							}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						{/* {(openWithdraw && isGameWithdraw) || openReinvest ? '' : <button
							type='button'
							className='game__head-btn transaction__btn input__btn'
							onClick={() => setValue(parseInt(maximum) / 1_000_000)}
						>
							{t('Максимум')}
						</button>
						} */}
					</div>
				</div>
				<div
					className='balance-card__row'
					style={{
						padding: '0 10px',
						justifyContent: 'space-between',
						marginRight: 0,
					}}
				>
					<div>
						{(openWithdraw && isGameWithdraw) || openReinvest ? null : (
							<span style={{ fontSize: 14 }}>
								{t(
									`Остаток средств: ${maximum / 1_000_000} ${
										openTopUp ? 'USDT' : 'CCO'
									}`
								)}
							</span>
						)}
					</div>
					{/* {
                        openTopUp
                            ? <div >
                                <button type="button" className="game__head-btn transaction__btn" onClick={() => { closeModal(); setOpenApprove(true) }}>
                                    {t('Утвердить')}
                                </button>
                            </div>
                            : null
                    } */}
				</div>
				<div className='balance-card__row'>
					<div className='balance-card__col'>
						<Button name='replenish' onClick={submitForm} fullWidth>
							{openTopUp
								? t('Пополнить')
								: openWithdraw
								? t('Вывести')
								: openReinvest
								? t('РЕИНВЕСТИРОВАТЬ')
								: ''}
						</Button>
					</div>
				</div>
			</div>
		</ReactModal>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCCOBalance: (balance) =>
		Web3Actions.setCCOBalance(
			dispatch({
				type: Constants.SET_CCO_BALANCE,
				data: { ccoBalance: balance },
			})
		),
});

export default connect(null, mapDispatchToProps)(WithdrawModal);
