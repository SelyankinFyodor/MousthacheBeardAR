import App from './App'
import renderer from 'react-test-renderer';
import React from "react";

test('app component should create', ()=>{
  const appComponent = renderer.create(
      <App />,
  ).toJSON()
  expect(appComponent).toBeTruthy();
})



