// import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './../src/reducers';
import thunk from "redux-thunk";

// export const findByTestAtrr = (component, attr) => {
//     const wrapper = component.find(`[data-test='${attr}']`);
//     return wrapper;
// };

// export const checkProps = (component, expectedProps) => {
//     const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
//     return propsErr;
// };

// const store = createStore(appReducers, composeEnhancer(applyMiddleware(thunk)));

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};