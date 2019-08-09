import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from "connected-react-router";

import history from "../routes/history";

import createRootReducer from "./ducks"

const middlewares = [
    routerMiddleware( history ),
];

const store = createStore (
    createRootReducer( history ),
    compose( applyMiddleware( ...middlewares ) ),
)

export default store;