import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';

import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';

class SideDrawer extends Component {
    onClickItem = (screenName, title) => {
        Promise.all([
            Icon.getImageSource("ios-close", 40),
        ]).then(sources => {
            Navigation.showModal({
                screen: 'shopping-app.'+screenName, // unique ID registered with Navigation.registerScreen
                title: title, // navigation bar title of the pushed screen (optional)
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: sources[0],
                            title: "Close",
                            id: "closeModal"
                        }
                    ]
                }
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-apps"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>View Orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickItem('AddProduct', 'Add A Product')}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-add-circle"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Add A Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickItem('RemoveProduct', 'Remove A Product')}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-remove-circle"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Remove A Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-arrow-dropup-circle"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Change Product Status</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-star"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Review Top Products</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-photos"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>View My Orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name="ios-log-out"
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        borderBottomWidth: 1,
        borderBottomColor: "#cecece"
    },
    drawerItemIcon: {
        margin: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);