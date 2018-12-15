This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses the following JS libraries and components:
* yarn is used as package manager but this should work fine with npm.
* TypeScript as scripting language
* react-leaflet and leaflet for map
* Material-UI for presentation components
* typeface-roboto as default font
* NumberFormat for field formatting and validation

While the map will resize nicely with mobile, the form needs a bit of extra work to behave well with a small screen. The current form position doesn't match the constraint of a mobile and should be set in absolute position above or below the map.

It would have been interesting to add an extra min ratio income/savings field in the data source and filter the visible markers accordingly.

## Available Scripts

In the project directory, you can run:


### `yarn install or npm install`

To install all the required packages.

### `yarn start or npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test or npm run test`

Only few tests have been implemented. It will be interested to have some tests running on the form validation.

### `yarn build or npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn eject or npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
