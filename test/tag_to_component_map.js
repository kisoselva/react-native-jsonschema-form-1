import {
  Button,
  FlatList,
  TextInput,
  Text,
  View
} from "react-native";
import Form from "../src/components/Form";
import { Label } from "../src/components/fields/SchemaField";
import { BaseInput } from "../src/components/widgets/BaseInput";
import CheckBox from '@react-native-community/checkbox';

const map = {
  button: Button,
  checkbox: CheckBox,
  "flat-list": FlatList,
  form: Form,
  input: TextInput,
  label: Label,
  text: Text,
  view: View,
}

export default map;