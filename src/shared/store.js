import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import nowListening from './redux/now-listening';
import menu from './redux/menu';

const LOG = process.env.NODE_ENV !== 'production';
const middleware = LOG ? applyMiddleware(thunk, createLogger({ collapsed: true })) : applyMiddleware(thunk);
const finalCreateStore = compose(middleware)(createStore);

export default finalCreateStore(
    combineReducers({
        nowListening,
        menu
    })
);
