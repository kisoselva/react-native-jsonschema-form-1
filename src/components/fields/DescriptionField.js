import React from "react";
import PropTypes from "prop-types";

import { Text, View } from "react-native";

function DescriptionField(props) {
  const { id, description } = props;
  if (!description) {
    return null;
  }
  if (typeof description === "string") {
    return (
      <Text id={id} className="field-description">
        {description}
      </Text>
    );
  } else {
    return (
      <View id={id} className="field-description">
        {description}
      </View>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
}

export default DescriptionField;
