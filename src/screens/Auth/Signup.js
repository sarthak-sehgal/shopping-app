import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { signUp } from '../../store/actions/index';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        address: '',
        phoneNo: ''
    }
    render() {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phoneNo
        };

        let signUpForm = (
            <View style={styles.authContainer}>
                <Text style={styles.heading}>Sign up to shop!</Text>
                <TextInput
                    onChangeText={(email) => this.setState({ email: email })}
                    value={this.state.email}
                    style={styles.authTextInput}
                    placeholder="E-mail"
                    autoCapitalize="none"
                />
                <TextInput
                    onChangeText={(pwd) => this.setState({ password: pwd })}
                    value={this.state.password}
                    style={styles.authTextInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TextInput
                    //onChangeText={}
                    //value={}
                    style={styles.authTextInput}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TextInput
                    onChangeText={(address) => this.setState({ address: address })}
                    value={this.state.address}
                    style={styles.authTextInput}
                    placeholder="Address"
                />
                <TextInput
                    onChangeText={(phoneNo) => this.setState({ phoneNo: phoneNo })}
                    value={this.state.phoneNo}
                    style={styles.authTextInput}
                    placeholder="Phone Number"
                />
                <Button
                    title="Sign Up"
                    onPress={() => this.props.onSignUp(authData)}
                />
            </View>
        )

        if (this.props.isLoading) {
            signUpForm = (
                <View style={styles.authContainer}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View>
                {signUpForm}
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (authData) => dispatch(signUp(authData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);