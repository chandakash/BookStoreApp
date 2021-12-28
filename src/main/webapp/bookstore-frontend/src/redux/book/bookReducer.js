import * as BT from "./bookTypes";
import {addSelectedData} from './bookUtils';

const initialState = {
  book: "",
  error: "",
  selectedData:[],
  rows: [],
  currentPage: 0,
  totalDataCount: 0,
  searchText: "",
  languageList:[],
  genreList:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_BOOK_REQUEST:
    case BT.FETCH_BOOK_REQUEST:
    case BT.UPDATE_BOOK_REQUEST:
    case BT.DELETE_BOOK_REQUEST:
    case BT.FETCH_LANGUAGES_REQUEST:
    case BT.FETCH_GENRES_REQUEST:
    case BT.FETCH_ALL_BOOKS:
      return {
        ...state,
      };
    case BT.ADD_SELECTED_ROW:{
      return {
        ...state,
        selectedData : addSelectedData(state.selectedData,action.payload)
      }
    }
    case BT.BOOK_SUCCESS:
      return {
        // book: action.payload,
        ...state,
        rows: [...state.rows,action.payload]
      };
    case BT.BOOK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case BT.LANGUAGES_SUCCESS:
      return {
        ...state,
        languageList: action.payload,
        error: "",
      };
    case BT.LANGUAGES_FAILURE:
      return {
        languageList: [],
        error: action.payload,
      };
    case BT.GENRES_SUCCESS:
      return {
        genreList: action.payload,
        error: "",
      };
    case BT.GENRES_FAILURE:
      return {
        genreList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
