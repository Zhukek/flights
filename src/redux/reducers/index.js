import data from '../../data/flights.json';
import { SORT_FLIGHTS, TRANSFER_CLICK, NO_TRANSFER_CLICK, SET_SORT_TYPE, 
  SET_MAX_PRICE, SET_MIN_PRICE, SELECT_COMPANY, SET_COMPANY, PAGE_UP, PAGE_DOWN } from '../actions';

const initialState = {
  selected: [...data.result.flights],
  filters: {
    transfer: false,
    noTransfer: false,
    sort: '',
    minPrice: 0,
    maxPrice: 0,
    company: {}
  },
  availableCompany: [],
  page: 0
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SORT_FLIGHTS:
      return {
        ...state,
        selected: action.selected,
        page: 0
      }
    case TRANSFER_CLICK:
      return {
        ...state,
        filters: {
          ...state.filters,
          transfer: !state.filters.transfer,
          noTransfer: false
        }
      }
      case NO_TRANSFER_CLICK:
        return {
          ...state,
          filters: {
            ...state.filters,
            transfer: false,
            noTransfer: !state.filters.noTransfer
          }
        }
      case SET_SORT_TYPE:
        return {
          ...state,
          filters: {
            ...state.filters,
            sort: action.sort
          }
        }
      case SET_MIN_PRICE:
        return {
          ...state,
          filters: {
            ...state.filters,
            minPrice: action.value
          }
        }
      case SET_MAX_PRICE:
        return {
          ...state,
          filters: {
            ...state.filters,
            maxPrice: action.value
          }
        }
      case SELECT_COMPANY:
        return {
          ...state,
          filters: {
            ...state.filters,
            company: {
              ...state.filters.company,
              [action.company]: !state.filters.company[action.company]
            }
          }
        }
      case SET_COMPANY:
        return {
          ...state,
          availableCompany: action.company
        }
      case PAGE_UP:
        return {
          ...state,
          page: state.page + 1
        }
      case PAGE_DOWN:
        return {
          ...state,
          page: state.page - 1
        }
    default:
      return state
  }
}