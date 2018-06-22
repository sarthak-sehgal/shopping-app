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
        ]
    })
}

export default startMain;