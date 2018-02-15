// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// LOCAL - API
import { callApiFunction } from './src/components/api/app'

// COMPONENTS

// ROUTES
import Routes from './src/routes/Routes'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

class App extends Component {
  render() {
    const sys_state = this.props.sys_state
    return (
      <div className='app-component-wrapper'>
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    sys_state: state
})

App.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(App)

