import { GET_RESTAURANT } from "./actions";

const initialState = {
    resturants: [],
  };
  
  function resturantReducer(state = initialState, action) {
    switch (action.type) {
      case GET_RESTAURANT:
        return { ...state, resturants: action.payload };
      default:
        return state;
    }
  }
  
  export default resturantReducer;