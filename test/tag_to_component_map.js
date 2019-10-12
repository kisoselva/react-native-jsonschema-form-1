import {
  FlatList,
  Picker,
  Text,
  View
} from "react-native";
import Form from "../src/components/Form";
import { Label } from "../src/components/fields/SchemaField";
import { BaseInput } from "../src/components/widgets/BaseInput";
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { Button, TextInput } from "react-native-paper";

const map = {
  button: Button,
  checkbox: CheckBox,
  "flat-list": FlatList,
  form: Form,
  input: TextInput,
  label: Label,
  "radio-form": RadioForm,
  "radio-button-input": RadioButtonInput,
  "radio-button-label": RadioButtonLabel,
  select: Picker,
  text: Text,
  view: View,
}

export default map;