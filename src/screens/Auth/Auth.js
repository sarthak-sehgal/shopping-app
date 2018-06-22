import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

import startMain from '../StartMain/StartMain';

class AuthScreen extends Component {
    state = {
        username: '',
        password: ''
    }

    loginHandler = () => {
        if(this.state.username === "test" && this.state.password === "test") {
            startMain();
        } else {
            alert("Username or password incorrect! Try again.");
        }
    }

    signupHandler = () => {
        this.props.navigator.push({
            screen: 'shopping-app.SignupScreen', // unique ID registered with Navigation.registerScreen
            title: 'Sign Up'
        })
    }
    
    render () {
        return (
            <View style={styles.authContainer}>
                <Text style={styles.heading}>Login to shop!</Text>
                <TextInput
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    style={styles.authTextInput}
                    placeholder="Username"
                    autoCapitalize="none"
                />
                <TextInput
                    onChangeText={(pwd) => this.setState({password: pwd})}
                    value={this.state.password}
                    style={styles.authTextInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <Button
                    title="Login" 
                    onPress={this.loginHandler}/>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <Button
                        title="Sign Up!" 
                        onPress={this.signupHandler}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    heading: {
        marginBottom: 15,
        fontSize: 25
    },
    authTextInput: {
        width: '80%',
        marginBottom: 15,
        fontSize: 20,
        padding: 5,
        borderBottomWidth: 3,
        borderBottomColor: '#eee'
    },
    signupContainer: {
        marginTop: 40
    },
    signupText: {
        fontSize: 20
    }
});

export default AuthScreen;