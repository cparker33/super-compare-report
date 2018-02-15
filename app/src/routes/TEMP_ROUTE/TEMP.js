// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// DEV
const log = console.log // eslint-disable-line no-unused-vars


class TEMP extends Component {
  
  render() {
    return (
      <div
        className='app-cont'>
        TEMP
      </div>
    )
  }
}

const mapStateToProps = state => ({
    sys_state: state
})

TEMP.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(TEMP)