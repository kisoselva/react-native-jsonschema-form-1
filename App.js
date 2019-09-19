/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from './src/components2/Context';
import { Testable } from './src/components2/Testable';


const App = () => {
  return (
    <Provider value="red">
      <Testable pair="blue" />
    </Provider>
  );
};

export default App;
