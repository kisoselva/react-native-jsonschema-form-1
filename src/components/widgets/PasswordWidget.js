import React from "react";
import PropTypes from "prop-types";

function PasswordWidget(props) {
  const { BaseInput } = props.registry.widgets;
  const { style, ...passwordProps } = props;
  return (
    <BaseInput
      secureTextEntry={true}
      textContentType="password"
      style={style.TextInput}
      {...passwordProps}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default PasswordWidget;
