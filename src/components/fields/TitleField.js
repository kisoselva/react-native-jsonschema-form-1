import React from "react";
import PropTypes from "prop-types";

import { Text } from "react-native";

const REQUIRED_FIELD_SYMBOL = "*";

function TitleField(props) {
  const { id, title, required, style } = props;
  return (
    <Text id={id} style={style}>
      {/* {title} */}
      {/* {required && <Text className="required" style={style && style.required}>{REQUIRED_FIELD_SYMBOL}</Text>} */}
    </Text>
  );
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default TitleField;
