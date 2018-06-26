import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

import {connect} from 'react-redux';
import {login} from '../../store/actions/auth';

class AuthScreen extends Component {
    state = {
        email: '',
        password: ''
    }

    signupHandler = () => {
        this.props.navigator.push({
            screen: 'shopping-app.SignupScreen', // unique ID registered with Navigation.registerScreen
            title: 'Sign Up'
        })
    }
    
    render () {
        const authData = {
            email: this.state.email,
            password: this.state.password
        }

        return (
            <View style={styles.authContainer}>
                <Text style={styles.heading}>Login to shop!</Text>
                <TextInput
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}
                    style={styles.authTextInput}
                    placeholder="E-mail"
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
                    onPress={() => this.props.onLogin(authData)}/>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(login(authData))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);