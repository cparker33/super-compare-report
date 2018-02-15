// DEPENDENCIES
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'

// require('create-react-class')
require('babel-polyfill')

// ASSETS
import 'normalize.css'
import './src/assets/scss/app.scss'

// COMPONENTS
import store from './src/components/store/store'

//  MUI STACK
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './src/assets/themes/mui_theme.js'

// ROUTES
import App from './App'
 
ReactDOM.render (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)