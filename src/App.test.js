import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);
 
describe('Render App when not logged in', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
        auth : {user:{
          accessToken: "",
          email: "taniya@gmail.com",
          id: 1,
          roles: [
            "ROLE_ADMIN"
          ],
          tokenType: "Bearer",
          username: "Taniya"
        }, 
      isLoggedIn : false},
      message : ""
    });
 
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
});

describe('Render App when logged in', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
        auth : {user:{
          accessToken: "",
          email: "taniya@gmail.com",
          id: 1,
          roles: [
            "ROLE_ADMIN"
          ],
          tokenType: "Bearer",
          username: "Taniya"
        }, 
      isLoggedIn : true},
      message : ""
    });
 
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
});