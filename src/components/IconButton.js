import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

// TODO style
export default function IconButton(props) {
  const { type = "default", icon, className, ...otherProps } = props;
  return (
    <Icon
      name={icon}
      className={`btn btn-${type} ${className}`}
      {...otherProps}
    />
  );
}
