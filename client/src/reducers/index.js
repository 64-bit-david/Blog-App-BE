import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import authReducer from './authReducer';
import storiesReducer from './storiesReducer';
import storyReducer from './storyReducer'


export default combineReducers({
  stories: storiesReducer,
  auth: authReducer,
  story: storyReducer,
  author: authorReducer
})