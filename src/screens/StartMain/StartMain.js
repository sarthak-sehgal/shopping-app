import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startMain = () => {
    Promise.all([
        Icon.getImageSource("ios-star", 30),
        Icon.getImageSource("ios-albums", 30),
        Icon.getImageSource("ios-cart", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Top Products', // tab label as appears under the icon in iOS (optional)
                    screen: 'shopping-app.TopProducts', // unique ID registered with Navigation.registerScreen
                    title: 'Explore Top Products', // title of the screen as appears in the nav bar (optional)
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[3],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    label: 'All Products',
                    screen: 'shopping-app.AllProducts',
                    title: 'Explore All Products',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[3],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    label: 'Cart',
                    screen: 'shopping-app.Cart',
                    title: 'Shopping Cart',
                    icon: sources[2],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[3],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                initialTabIndex: 1
            },
            drawer: { // optional, add this if you want a side menu drawer in your app
                left: { // optional, define if you want a drawer from the left
                    screen: 'shopping-app.SideDrawer', // unique ID registered with Navigation.registerScreen
                    passProps: {...this.props}, // simple serializable object that will pass as props to all top screens (optional),
                    fixedWidth: 400, // a fixed width you want your left drawer to have (optional)
                }
            }
        });
    })
}

export default startMain;