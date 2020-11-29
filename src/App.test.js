import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { testStore } from './../Utils';
import App from './App';

Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
})

const setUp = (initialState={}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />).childAt(0).dive();
  return wrapper;
};

describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {
            friends: [
              { id: 1, name: "rahul gupta", favourite: false },
              { id: 2, name: "shivangi sharma", favourite: false },
            ]
        }
        wrapper = setUp(initialState);
    });

    it('It should render without errors', () => {
        // const comp = shallow(<App />);
        // const wrapper = comp.find('.friend-app');
        expect(wrapper.length).toBe(1);
        // const component = findByTestAtrr(wrapper, 'appComponent');
        // expect(component.length).toBe(1);
    });
});
