import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';
import {authGetUID} from '../../store/actions/index';

class TopProducts extends Component {
    constructor (props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount() {
        this.props.getUID;
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
                <Text>TopProducts screen!</Text>
                <Text>{this.props.uid}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUID: dispatch(authGetUID())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopProducts);