import { createStore, applyMiddleware } from "redux";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { userDataReducer } from './reducers';
import logger from "redux-logger";

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: "",
    stateReconciler: hardSet
}

const pReducer = persistReducer(persistConfig, userDataReducer);

export const store = createStore(
    pReducer,
    undefined,
    applyMiddleware(logger)
);

export const persistor = persistStore(store);