import {
  Button,
  FlatList,
  Picker,
  Text,
  TextInput,
  View
} from "react-native";
import Form from "../src/components/Form";
import { Label } from "../src/components/fields/SchemaField";
import { BaseInput } from "../src/components/widgets/BaseInput";
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonLabel } from "react-native-simple-radio-button";

const map = {
  button: Button,
  checkbox: CheckBox,
  "flat-list": FlatList,
  form: Form,
  input: TextInput,
  label: Label,
  "radio-form": RadioForm,
  "radio-button": RadioButton,
  "radio-button-label": RadioButtonLabel,
  select: Picker,
  text: Text,
  view: View,
}

export default map;