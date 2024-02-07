/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {configureFacebookSDK} from './src/utils/facebookSDK';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // replace with your web client ID
  offlineAccess: true,
});
// Initialize Facebook SDK
configureFacebookSDK();

AppRegistry.registerComponent(appName, () => App);
