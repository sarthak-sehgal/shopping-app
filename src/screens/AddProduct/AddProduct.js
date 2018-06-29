import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/index';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        productName: '',
        productDescription: '',
        productPrice: ''
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "closeModal") {
                this.props.navigator.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                });
            }
        }
    }

    render() {
        const productDetails = {
            name: this.state.productName,
            description: this.state.productDescription,
            price: this.state.productPrice
        }

        let addProductForm = (
            <View style={styles.container}>
                <Text style={styles.heading}>New Product</Text>
                <TextInput
                    onChangeText={(name) => this.setState({ productName: name })}
                    value={this.state.productName}
                    style={styles.textInput}
                    placeholder="Product Name"
                />
                <TextInput
                    onChangeText={(description) => this.setState({ productDescription: description })}
                    value={this.state.productDescription}
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Product Description"
                    multiline={true}
                    numberOfLines={4}
                />
                <TextInput
                    onChangeText={(price) => this.setState({ productPrice: price })}
                    value={this.state.productPrice}
                    style={styles.textInput}
                    placeholder="Price"
                />
                <Button
                    title="Add Product"
                    onPress={() => this.props.onAddProduct(productDetails)}
                />
            </View>
        );

        if(this.props.isLoading) {
            addProductForm = <ActivityIndicator />;
        }

        return (
            <View style={styles.container}>
                {addProductForm}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
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
    textInput: {
        width: '80%',
        marginBottom: 15,
        fontSize: 20,
        padding: 5,
        borderBottomWidth: 3,
        borderBottomColor: '#eee'
    },
    textArea: {
        height: 60
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (productDetails) => dispatch(addProduct(productDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);