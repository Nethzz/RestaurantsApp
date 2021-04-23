/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RootContainer from './src/RootContainer';

AppRegistry.registerComponent(appName, () => RootContainer);
console.disableYellowBox = true;
