import { FETCH_STORY } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_STORY:
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}