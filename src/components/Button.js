import React from "react";
import classNames from "classnames";

import "components/Button.scss";

// defines a function component (Button) that accepts a single argument, (props)/ Which represents properties passed ot the component.
export default function Button(props) {
  // the initial css for our button
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
