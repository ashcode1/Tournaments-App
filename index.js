/**
 * @format
 */

import { AppRegistry } from 'react-native';
import BaseProvider from './src/providers/BaseProvider';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => BaseProvider);
