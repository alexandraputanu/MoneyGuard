import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrencyData } from '../../redux/Currency/selectors';

import s from './Currency.module.css';

import imageTab from '../../../public/img/currency.png';
import { getCurrency } from '../../redux/Currency/operations';
import useMedia from '../../hooks/useMedia';

// Factorul de conversie din hryvnia (UAH) în RON
const UAH_TO_RON = 0.13; // Ex: 1 UAH = 0.13 RON

const Currency = () => {
    const currency = useSelector(selectCurrencyData);
    const dispatch = useDispatch();
    const { isDesktop } = useMedia();

    useEffect(() => {
        dispatch(getCurrency());
    }, [dispatch]);

    // Aplicați factorul de conversie
    const rateBuyDollar = (currency?.dollar.rateBuy * UAH_TO_RON).toFixed(2);
    const rateSellDollar = (currency?.dollar.rateSell * UAH_TO_RON).toFixed(2);
    const rateBuyEuro = (currency?.euro.rateBuy * UAH_TO_RON).toFixed(2);
    const rateSellEuro = (currency?.euro.rateSell * UAH_TO_RON).toFixed(2);

    return (
        <div className={s.currency_wrapper}>
            <div className={s.currency_table}>
                <ul className={s.currency_table_head}>
                    <li className={s.currency_item}>Currency</li>
                    <li className={s.currency_item}>Purchase (RON)</li>
                    <li className={s.currency_item}>Sale (RON)</li>
                </ul>
                <ul className={s.table_body}>
                    <li className={s.currency_tr}>
                        <p className={s.currency}>USD</p>
                        <p className={s.currency}>{rateBuyDollar}</p>
                        <p className={s.currency}>{rateSellDollar}</p>
                    </li>
                    <li className={s.currency_tr}>
                        <p className={s.currency}>EUR</p>
                        <p className={s.currency}>{rateBuyEuro}</p>
                        <p className={s.currency}>{rateSellEuro}</p>
                    </li>
                </ul>
            </div>

            {isDesktop ? (
                <div className={s.diagram}>
                    <p className={s.lowerNumber}>{rateBuyDollar}</p>
                    <p className={s.higherNumber}>{rateBuyEuro}</p>
                    <img src={imageTab} alt="" />
                </div>
            ) : (
                <img src={imageTab} />
            )}
        </div>
    );
};

export default Currency;
