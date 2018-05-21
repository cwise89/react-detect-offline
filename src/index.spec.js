import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { Online, Offline } from "./";

const eventListenerMap = {};
beforeEach(() => {
  window.addEventListener = jest.fn((event, cb) => {
    eventListenerMap[event] = cb;
  });
  window.removeEventListener = jest.fn(event => {
    eventListenerMap[event] = undefined;
  });
});

describe("Online", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: true
    });
  });

  it("should render children when online", () => {
    const wrapper = mount(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should render children when online and using a custom polling URL", () => {
    const wrapper = mount(
      <Online pollingUrl="https://www.google.com/">
        <h1>Hello World</h1>
      </Online>
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should not render children when offline", () => {
    Object.defineProperty(navigator, "onLine", { value: false });

    const wrapper = mount(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    expect(wrapper.html()).toBeNull();
  });

  it("should not render children when offline and using a custom polling URL", () => {
    Object.defineProperty(navigator, "onLine", { value: false });

    const wrapper = mount(
      <Online pollingUrl="https://www.google.com/">
        <h1>Hello World</h1>
      </Online>
    );

    expect(wrapper.html()).toBeNull();
  });

  it("should not render children when going from online to offline", () => {
    const wrapper = mount(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    eventListenerMap.offline();

    expect(wrapper.html()).toBeNull();
  });

  it("should remove event listeners when unmounting", () => {
    const wrapper = mount(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );
    wrapper.unmount();

    expect(window.removeEventListener).toHaveBeenCalledTimes(2);
    expect(window.removeEventListener.mock.calls).toMatchSnapshot();
  });
});

describe("Offline", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: false
    });
  });

  it("should render children when offline", () => {
    const wrapper = mount(
      <Offline>
        <h1>Hello World</h1>
      </Offline>
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should render children when offline and using a custom polling URL", () => {
    const wrapper = mount(
      <Offline polling={{ url: "https://www.google.com/" }}>
        <h1>Hello World</h1>
      </Offline>
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should not render children when online", () => {
    Object.defineProperty(navigator, "onLine", { value: true });

    const wrapper = mount(
      <Offline>
        <h1>Hello World</h1>
      </Offline>
    );

    expect(wrapper.html()).toBeNull();
  });

  it("should not render children when online and using a custom polling URL", () => {
    Object.defineProperty(navigator, "onLine", { value: true });

    const wrapper = mount(
      <Offline polling={{ url: "https://www.google.com/" }}>
        <h1>Hello World</h1>
      </Offline>
    );

    expect(wrapper.html()).toBeNull();
  });

  it("should not render children when going from offline to online", () => {
    const wrapper = mount(
      <Offline>
        <h1>Hello World</h1>
      </Offline>
    );

    eventListenerMap.online();

    expect(wrapper.html()).toBeNull();
  });

  it("should remove event listeners when unmounting", () => {
    const wrapper = mount(
      <Offline>
        <h1>Hello World</h1>
      </Offline>
    );
    wrapper.unmount();

    expect(window.removeEventListener).toHaveBeenCalledTimes(2);
    expect(window.removeEventListener.mock.calls).toMatchSnapshot();
  });
});
