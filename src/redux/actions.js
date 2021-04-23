export const GET_RESTAURANT = 'GET_RESTAURANT';
import {restaurants} from '../utils/restaurants.json';
export const getRestaurant = () => {
    try {
      return async dispatch => {
      
    
          dispatch({
            type: GET_RESTAURANT,
            payload:restaurants
          });
       
      };
    } catch (error) {
      // Add custom logic to handle errors
      console.log(error);
    }
  };