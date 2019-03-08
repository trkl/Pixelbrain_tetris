import React from "react";
import KeyboardObservableContextConsumer from "../Context/KeyboardObservableContextConsumer";

const WithKeyboardSubscribe = WrappedComponent => props => (
  <KeyboardObservableContextConsumer>
    {subscribe => (
      <WrappedComponent {...props} keyboard={subscribe}>
        {props ? props.children : []}
      </WrappedComponent>
    )}
  </KeyboardObservableContextConsumer>
);

export default WithKeyboardSubscribe;
