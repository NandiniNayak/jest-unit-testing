import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

const setup = (props = {}, state = null) => {
  // shallow will contain a component as a unit and not indrectly behavioring on child components.
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("render without errors", () => {
  const wrapper = setup();

  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("we're trying to display the counter", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  // <App /> = component-app
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  // make sure the state is defined in this.state = under constructor
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

// We want to make sure that the button
test("clicking button increments counter display", () => {
  // We simulate the counter. For example if the counter starts at 7, we want it to increment to 8.
  const counter = 7;
  const wrapper = setup(null, { counter });

  // Find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  // Find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  // .text is another shallow wrapper method .text returns a string of the text contained with that element. The reason why we do toContain instead of toBe is that if I want to change anything in the counter display withou changing the state, I can do that and it won't fail.
  expect(counterDisplay.text()).toContain(counter + 1);
});
