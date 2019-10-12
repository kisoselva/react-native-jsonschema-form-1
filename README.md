react-native-jsonschema-form
============================

A simple [React Native](http://facebook.github.io/react-native/) component capable of building forms  out of a [JSON schema](http://json-schema.org/).

Based on the great [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

### Regexes to find tags to customize:

#### Any Capitalized Tag
```
<([A-Z]+[a-z]+)
```

#### Exact tags:
```
<(Text|View|Button)
```

#### Original tags or part of tags created by react-jsonschema-form that should not have its signatures changed because they are part of their core:
1. Form
2. Widget
3. Field
4. Array
5. BaseInput
6. AddButton
7. ErrorList
8. IconButton
9. Component
10. Template
11. DateElement
12. WrapIfAdditional
13. LabelInput
14. Help

These tags are used to componentize other parts of the forms, so you should instead customize the render elements of these tags such as Input, Icon, FlatList etc.

Thus:
```
(Form|Widget|Field|Array|BaseInput|AddButton|ErrorList|IconButton|Component|Template|DateElement|WrapIfAdditional|LabelInput|Help)
```

We can filter out above tags by:
```
<(?!(.*)(Form|Widget|Field|Array|BaseInput|AddButton|ErrorList|IconButton|Component|Template|DateElement|WrapIfAdditional|LabelInput|Help))([A-Z]+[a-z]+)
```

#### Make sure no className were deleted:
```
<(.)*className
```

## About
This is a fork of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). The difference is in the tests, made with [react-test-renderer](https://reactjs.org/docs/test-renderer.html), and React Native components instead of HTML ones.

## Thanks
To all [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) contributors!

## Documentation
Documentation is hosted on: https://react-jsonschema-form.readthedocs.io/

## License
Apache 2