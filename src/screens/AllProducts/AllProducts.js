import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts, searchProducts } from '../../store/actions/index';

class AllProducts extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        searchQuery: ''
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

    searchHandler = (query) => {
        this.setState({ searchQuery: query });
        this.props.searchProducts(query);
    }


    render() {
        let productsList = (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    onChangeText={(query) => this.searchHandler(query)}
                    value={this.state.searchQuery}
                    placeholder={"Search products..."}
                />
                <View style={styles.productsContainer}>
                    <FlatList
                        style={styles.productList}
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
            </View>
        );
        if (this.props.isLoading) {
            productsList = (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
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
    searchBar: {
        width: '95%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 3,
        padding: 5,
        marginBottom: 10,
        height: 40,
        color: '#000'
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
    productList: {
        width: '100%'
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
        products: state.products.searchResults,
        isLoading: state.ui.isLoading
    }
}

mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        searchProducts: (query) => dispatch(searchProducts(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);