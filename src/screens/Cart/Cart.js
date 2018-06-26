import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }

    render () {
        return (
            <View>
                <Text>Cart screen!</Text>
            </View>
        )
    }
}

export default Cart;