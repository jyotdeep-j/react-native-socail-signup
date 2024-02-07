import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const configureFacebookSDK = () => {
  // Initialize the Facebook SDK
  LoginManager.setLoginBehavior('web');
};
