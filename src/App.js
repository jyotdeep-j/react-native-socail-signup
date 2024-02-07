import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in process canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in process is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Error during Google Sign-In:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error('Error during Google Sign-Out:', error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      // Log in with Facebook
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      // Check if the user canceled the login
      if (result.isCancelled) {
        console.log('Facebook login canceled');
        return;
      }

      // Get the access token
      const accessToken = await AccessToken.getCurrentAccessToken();

      if (accessToken) {
        // Use the access token to retrieve user information
        const response = await fetch(
          `https://graph.facebook.com/v14.0/me?access_token=${accessToken.accessToken}&fields=id,name,email`,
        );
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  const signOutFromFacebook = () => {
    // Log out from Facebook
    LoginManager.logOut();
    setUserInfo(null);
  };

  return (
    <View>
      {userInfo ? (
        <>
          <Text>Welcome, {userInfo.user.name}!</Text>
          <Button title="Sign Out" onPress={signOut} />
          <Button title="Sign Out Facebook" onPress={signOutFromFacebook} />
        </>
      ) : (
        <>
          <Button title="Sign In with Google" onPress={signIn} />
          <Button title="Sign In with Facebook" onPress={signInWithFacebook} />
        </>
      )}
    </View>
  );
};

export default App;
