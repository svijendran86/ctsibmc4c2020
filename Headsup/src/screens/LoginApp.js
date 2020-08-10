import React, { Component, useState } from "react";
import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert } from "react-native";
import App from '../../App';
import auth, { firebase } from "@react-native-firebase/auth";
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\nCmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\nShake or press menu button for dev menu"
});

const firebaseCredentials = Platform.select({
  ios: "https://invertase.link/firebase-ios",
  android: "https://invertase.link/firebase-android"
});

type Props = {};

const tag = "FIREBASE";
export default class LoginApp extends Component<Props> {

  state = {
    isLogin: false,
    authenticated: false,
	email: '',
	password: '',
	fetching: false,
	isValid: true,
	error: ''
  };
  componentDidMount() {
    this.__isTheUserAuthenticated();
  }

  __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser;
    if (user) {
      console.log(tag, user);
      
      this.setState({ authenticated: true });
	 // props.navigation.navigate('Home');
    } else {
      this.setState({ authenticated: false });
    }
  };

   __doLogin = () => {
    if (!this.state.email) {
	  this.setState({ error: "Email required *" });
      this.setState({isValid:false});
      return;
    } else if (!this.state.password && this.state.password.trim() && this.state.password.length > 6) {
	  this.setState({ error: "Weak password, minimum 5 chars" });
      this.setState({isValid:false});
      return;
    } else if (!__isValidEmail(this.state.email)) {
	   this.setState({ error: "Invalid Email" });
      this.setState({isValid:false});
      return;
    }

    this.__doSingIn(this.state.email, this.state.password);
  };

   __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        //Alert.alert("Success ✅", "Logged successfully");
		this.setState({ authenticated: true });
      }else{
		    Alert.alert("Success ✅", "Account created successfully"+response);
		 this.setState({ error: "Invalid login" });
	  }
    } catch (e) {
      console.error(e.message);
    }
  };
  loginComponent() {
	  return (
	  <SafeAreaView style={styles.containerStyle}>
      <View style={{ flex: 0.2 }}>{!!this.state.fetching && <ActivityIndicator color={blue} />}</View>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}> Log In </Text>
      </View>
      <View style={styles.formContainerStyle}>
        <TextInput
          label={"Email"}
          autoCapitalize={false}
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            // let isValid = this.state.isValid;
            // isValid["email"] = !this.__isValidEmail(text);
            this.setState({isValid :__isValidEmail(text)});
            this.setState({email : text});
          }}
          error={this.state.isValid}
        />
        <TextInput label={"Password"} secureTextEntry autoCapitalize={false} style={styles.textInputStyle} selectionColor={blue} placeholder="Password" error={this.state.isValid} onChangeText={text => this.setState({password : text})} />
      </View>
      {this.state.error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </View>
      ) : null}

      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight style={styles.signInButtonStyle} onPress={this.__doLogin} underlayColor={blue}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
	  )
  }
  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ flex: 1 }}>
        {this.state.authenticated ? (
          <View style={styles.containerStyle}>
           <App/>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {this.state.isLogin ? this.loginComponent() : <SigInComponent />}

            <View style={styles.loginButtonContainerStyle}>
              <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const baseMargin = 5;
const doubleBaseMargin = 10;
const blue = "#ff0000";

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "space-around"
  },
  headerContainerStyle: {
    flex: 0.2,
    alignItems: "center"
  },
  headerTitleStyle: {
    color: blue,
    fontSize: 30,
    fontWeight: "bold"
  },
  formContainerStyle: {
    paddingHorizontal: doubleBaseMargin,
    justifyContent: "space-around"
  },
  textInputStyle: {
    height: 60,
    marginVertical: baseMargin,
    borderRadius: 6,
    paddingHorizontal: doubleBaseMargin,
    backgroundColor: "transparent",
    borderColor: "#888",
    borderWidth: 1
  },
  signInButtonContainerStyle: {
    flex: 0.3,
    marginTop: doubleBaseMargin,
    alignItems: "flex-end",
    paddingHorizontal: baseMargin
  },
  signInButtonStyle: {
    width: 130,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 130 / 4,
    alignItems: "center",
    backgroundColor: "white"
  },
  signInButtonTextStyle: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: baseMargin
  },
  signInWithGoogleButtonContainerStyle: {
    flex: 0.2,
    paddingHorizontal: doubleBaseMargin
  },
  signInWithGoogleButtonStyle: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 130 / 4,
    alignItems: "center",
    backgroundColor: "white"
  },
  signInWithGoogleButtonTextStyle: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",

    marginHorizontal: baseMargin
  },
  errorLabelContainerStyle: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center"
  },
  loginButtonContainerStyle: {
    flex: 0.2,
    paddingHorizontal: baseMargin,
    justifyContent: "center",
    alignItems: "center"
  },
  loginButtonStyle: {
    alignItems: "center"
  },
  loginButtonTextStyle: {
    color: blue
  }
});

const __filterError = error => {
  let message = "";
  let index = error.indexOf("]");
  message = error.substr(index + 1, error.length - 1);

  return message;
};

const __isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


const SigInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setValid] = useState(true);
  const __doSignUp = () => {
    if (!email) {
      setError("Email required *");
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars");
      setValid(false);
      return;
    } else if (!__isValidEmail(email)) {
      setError("Invalid Email");
      setValid(false);
      return;
    }

    __doCreateUser(email, password);
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert("Success ✅", "Account created successfully");
      }else{
		    Alert.alert("Success ✅", "Account created successfully"+response);
		  setError("Invalid data");
	  }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={blue} />}</View>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}> Sign Up </Text>
      </View>
      <View style={styles.formContainerStyle}>
        <TextInput
          label={"Email"}
          autoCapitalize={false}
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            setError;
            setEmail(text);
          }}
          error={isValid}
        />

        <TextInput label={"Password"} secureTextEntry autoCapitalize={false} style={styles.textInputStyle} selectionColor={blue} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
      </View>
      {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight style={styles.signInButtonStyle} onPress={__doSignUp} underlayColor={blue}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};