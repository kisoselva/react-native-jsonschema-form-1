import React from "react";
import PropTypes from "prop-types";

import { rangeSpec } from "../../utils";

function UpDownWidget(props) {
  const {
    registry: {
      widgets: { BaseInput },
    },
    style
  } = props;
  return <BaseInput type="number" {...props} {...rangeSpec(props.schema)} style={style.TextInput} />;
}

if (process.env.NODE_ENV !== "production") {
  UpDownWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default UpDownWidget;
