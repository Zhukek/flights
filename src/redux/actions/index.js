import data from '../../data/flights.json';
import { sortFilter, transferFilter, priceFilter } from '../../services/filterFunctions';

export const SORT_FLIGHTS = 'SORT_FLIGHTS';
export const TRANSFER_CLICK = 'TRANSFER_CLICK';
export const NO_TRANSFER_CLICK = 'NO_TRANSFER_CLICK';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_MIN_PRICE = 'SET_MIN_PRICE';
export const SET_MAX_PRICE = 'SET_MAX_PRICE';
export const SELECT_COMPANY = 'SELECT_COMPANY';
export const SET_COMPANY = 'SET_COMPANY';
export const PAGE_UP = 'PAGE_UP';
export const PAGE_DOWN = 'PAGE_DOWN';

export const onLoad = () => {
  return function(dispatch) {
    const availableCompany = Array.from(new Set(data.result.flights.map(flight => flight.flight.carrier.caption)))
    dispatch({
      type: SET_COMPANY,
      company: availableCompany
    })
  }
}

export const applyFilters = () => {
  return function(dispatch, getState) {
    const {filters} = getState();
    let processData = [...data.result.flights];
    sortFilter(processData, filters.sort);
    processData = transferFilter(processData, filters.transfer, filters.noTransfer);
    processData = priceFilter(filters.minPrice, filters.maxPrice, processData);
    processData = companyFilter(processData, filters.company)
    dispatch({
      type: SORT_FLIGHTS,
      selected: processData
    })
  }
}

const companyFilter = (processData, companies) => {
  const keys = [];
  const entries = Object.entries(companies);
  for (const [key, value] of entries) {
    if (value === true) {
      keys.push(key);
    }
  }
  const result = keys.length !== 0 ?
   processData.filter(flight => keys.some(key => key === flight.flight.carrier.caption)) :
   processData
  return result
}