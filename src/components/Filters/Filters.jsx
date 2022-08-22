import styles from './styles.module.css';
import { TRANSFER_CLICK, NO_TRANSFER_CLICK, SET_SORT_TYPE, SET_MIN_PRICE, SET_MAX_PRICE, SELECT_COMPANY, applyFilters } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Filters = () => {
  const dispatch = useDispatch();
  const {filters, availableCompany} = useSelector(store => store);

  const onSortChange = e => {
    dispatch({
      type: SET_SORT_TYPE,
      sort: e.target.value
    });
  }

  const onCheckboxChange = e => {
    switch(e.target.value) {
      case 'transfer':
        dispatch({type: TRANSFER_CLICK})
        break
      case 'noTransfer':
        dispatch({type: NO_TRANSFER_CLICK})
        break
    }
  }

  const onNumberChange = e => {
    let value = Number(e.target.value);
    if (value < 0) {
      value = 0
    }
    switch(e.target.id) {
      case 'minPrice':
        dispatch({
          type: SET_MIN_PRICE,
          value: value
        })
        break
      case 'maxPrice':
        dispatch({
          type: SET_MAX_PRICE,
          value: value
        })
        break
    }
  }

  const onCompanyCheckboxChange = e => {
    dispatch({
      type: SELECT_COMPANY,
      company: e.target.value
    })
  }

  useEffect(() => {
    dispatch(applyFilters())
  },[filters])

  return (
    <header className={styles.root}>
      <fieldset className={styles.filterBlock} onChange={onSortChange}>
        <legend className={styles.filterName}>Сортировать</legend>
        <input className={styles.checkboxRadio} value='priceToHigh' type='radio' name='sortBy' id='priceToHigh' />
          <label className={styles.filterType} htmlFor='priceToHigh'>- по возрастанию цены</label>
        <input className={styles.checkboxRadio} value='priceToLow' type='radio' name='sortBy' id='priceToLow' />
          <label className={styles.filterType} htmlFor='priceToLow'>- по убыванию цены</label>
        <input className={styles.checkboxRadio} value='time' type='radio' name='sortBy' id='time' />
          <label className={styles.filterType} htmlFor='time'>- по времени в пути</label>
      </fieldset>
      <fieldset className={styles.filterBlock}>
        <legend className={styles.filterName}>Фильтровать</legend>
        <div>
          <input onChange={onCheckboxChange} checked={filters.transfer} id='transfer' value='transfer' type='checkbox' />
          <label className={styles.filterType} htmlFor='transfer'>- 1 пересадка</label>
        </div>
        <div>
          <input onChange={onCheckboxChange} checked={filters.noTransfer} id='noTransfer' value='noTransfer' type='checkbox' />
          <label className={styles.filterType} htmlFor='noTransfer'>- без пересадок</label>
        </div>
      </fieldset>
      <fieldset className={styles.filterBlock}>
        <legend className={styles.filterName}>Цена</legend>
        <div>
          <label className={styles.filterType} htmlFor='minPrice'>От </label>
          <input onChange={onNumberChange} id='minPrice' value={filters.minPrice} type='number' />
        </div>
        <div>
          <label className={styles.filterType} htmlFor='maxPrice'>До </label>
          <input onChange={onNumberChange} id='maxPrice' value={filters.maxPrice} type='number' />
        </div>
      </fieldset>
      <fieldset className={styles.filterBlock}>
        <legend className={styles.filterName}>Авиакомпании</legend>
        {availableCompany.map(company =>(
          <div key={company}>
            <input onChange={onCompanyCheckboxChange} checked={!!filters.company[company]} id={company} value={company} type='checkbox' />
            <label className={styles.filterType} htmlFor={company}>{company}</label>
          </div>
        ))}
      </fieldset>
    </header>
  )
}

export default Filters