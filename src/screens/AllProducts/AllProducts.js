import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/index';

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        let productsList = (
            <View style={styles.productsContainer}>
                <FlatList
                    data={this.props.products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                        <View style={styles.product}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>Price: {item.price}</Text>
                            <Text style={styles.productDescription}>{item.description}</Text>
                        </View>
                    }
                />
            </View>
        );
        if (this.props.isLoading) {
            productsList = <ActivityIndicator />;
        }

        return (
            <View style={styles.container}>
                {productsList}
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
    productsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '95%',
        height: '80%'
    },
    product: {
        backgroundColor: '#eee',
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        padding: 10
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    productDescription: {
        fontSize: 15,
        color: 'rgba(0,0,0,0.7)'
    },
    productPrice: {
        fontSize: 17,
        color: '#0090FF',
        marginBottom: 5
    }
});

mapStateToProps = state => {
    return {
        products: state.products.products,
        isLoading: state.ui.isLoading
    }
}

mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);