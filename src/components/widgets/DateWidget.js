import React from "react";
import PropTypes from "prop-types";

function DateWidget(props) {
  const {
    onChange,
    registry: {
      widgets: { BaseInput },
    },
    style
  } = props;
  return (
    <BaseInput
      type="date"
      {...props}
      onChange={value => onChange(value || undefined)}
      style={style.DateInput || style.BaseInput}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
}

export default DateWidget;
