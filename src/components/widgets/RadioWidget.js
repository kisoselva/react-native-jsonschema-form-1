import React from "react";
import PropTypes from "prop-types";

import { Text, View } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";

function RadioWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onBlur,
    onFocus,
    onChange,
    id,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, enumDisabled, inline } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <RadioForm
      id={id}
      formHorizontal={true}
      animation={true}
    >
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const itemDisabled =
          enumDisabled && enumDisabled.indexOf(option.value) != -1;
        const disabledCls =
          disabled || itemDisabled || readonly ? "disabled" : "";
        return (
            <RadioButton labelHorizontal={inline} key={i}>
              <RadioButtonInput
                obj={option}
                index={i}
                isSelected={option.value}
                onPress={_ => onChange(option.value)}
                borderWidth={1}
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={'#000'}
                buttonSize={40}
                buttonOuterSize={80}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={option}
                index={i}
                labelHorizontal={inline}
                onPress={_ => onChange(option.value)}
                labelStyle={{fontSize: 20, color: '#2ecc71'}}
                labelWrapStyle={{}}
              >
                {option.label}
              </RadioButtonLabel>
            </RadioButton>
        );
      })}
    </RadioForm>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
