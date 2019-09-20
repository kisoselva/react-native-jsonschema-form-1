import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconButton(props) {
  const { type = "default", icon, className, style, ...otherProps } = props;
  return (
    <Icon
      name={icon}
      className={`btn btn-${type} ${className}`}
      style={style}
      {...otherProps}
    />
  );
}
