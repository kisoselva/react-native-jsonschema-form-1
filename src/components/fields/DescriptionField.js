import React from "react";
import PropTypes from "prop-types";

import { Text, View } from "react-native";

function DescriptionField(props) {
  const { id, description, style } = props;
  if (!description) {
    return null;
  }
  if (typeof description === "string") {
    return (
      <Text id={id} className="field-description" style={style}>
        {description}
      </Text>
    );
  } else {
    return (
      <View id={id} className="field-description">
        <Text style={style}>{description}</Text>
      </View>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  };
}

export default DescriptionField;
