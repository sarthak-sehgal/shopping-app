import { Navigation } from 'react-native-navigation';

const startMain = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Top Products', // tab label as appears under the icon in iOS (optional)
                screen: 'shopping-app.TopProducts', // unique ID registered with Navigation.registerScreen
                title: 'Explore Top Products', // title of the screen as appears in the nav bar (optional)
            },
            {
                label: 'All Products',
                screen: 'shopping-app.AllProducts',
                title: 'Explore All Products'
            },
            {
                label: 'Cart',
                screen: 'shopping-app.Cart',
                title: 'Shopping Cart'
            }
        ],
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: 'shopping-app.SideDrawer', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
                fixedWidth: 400, // a fixed width you want your left drawer to have (optional)
            }
        }
    });
}

export default startMain;