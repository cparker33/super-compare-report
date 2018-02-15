// DEPENDENCIES
import React from 'react'
import { Route } from 'react-router-dom' 

// COMPONENTS
import HomePage from './home_page/HomePage'

const Routes = () => (
  <div>
    <Route path='/' exact={true} component={HomePage} />
  </div>
)

export default Routes