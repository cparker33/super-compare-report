// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import _ from 'lodash'
import changeCase from 'change-case'

// MUI-STACK
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// API
import { getLoc } from '../api/app.js'

// DEV
const log = console.log // eslint-disable-line no-unused-vars


const getStringIgnore = ['FORM']


class Location extends Component {


  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }  

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  getString = (string)=> {
    let new_string = '',
        section_title = '',
        arr = string.split('.'),
        text = ''

    let new_arr = []
    arr.forEach((a)=> {
      let num = Number(a)
      function isUpperCase(str) {
        return str === str.toUpperCase();
      }
      if (isUpperCase(a) && isNaN(num)) {
        getStringIgnore.forEach((ignore)=> {
          if (ignore !== a) {
            new_arr.push(a)
          }
        })
        
      }
    })

    text = changeCase.sentenceCase(new_arr[0])
    text = changeCase.titleCase(text)
    new_string += `${text} -> `

    text = ''
    let hlf = Math.round(new_arr.length / 2)
    text = changeCase.sentenceCase(new_arr[hlf])
    text = changeCase.titleCase(text)
    new_string += `${text} -> `

    text = ''
    text = changeCase.sentenceCase(arr[arr.length - 1])
    text = changeCase.titleCase(text)
    new_string += `${text}`

    return this.elipsThis(new_string)
    // return new_string
  }

  getStringLong = (string)=> {

    let new_string = ''
    let section_title = ''

    let arr = string.split('.')
    
    arr.forEach((lo, index)=> {
      let text = ''
      let num = Number(lo)
      if (!isNaN(num)) {
        text = `Form Section Number: ${lo}`
        new_string += `${text} -> `
      } else {
        if (lo !== '_attributes') {
          text = changeCase.sentenceCase(lo)
          text = changeCase.titleCase(text)
          new_string += `${text} -> `
        }
      }
    })
    return new_string
  }

  elipsThis = (string)=> {
    let trimmedString
    if (string.length > 40) {
      trimmedString = string.substring(0, 48)
      trimmedString = trimmedString + ' ...'
    } else {
      trimmedString = string
      let isNum = Number(trimmedString)
      if (!isNaN(isNum)) {
        trimmedString = format()(trimmedString)
      }
    }
    return trimmedString
  }

  render() {

    let loc = this.props.loc[0]


    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div className='comp-loc-main'>
        <div className='loc-button' onClick={this.handleOpen}>
          <span key={shortid.generate()}>
            {this.getString(loc)}  
          </span>
        </div>
        <Dialog title="Data Location" actions={actions}
          modal={true}
          open={this.state.open}>
        <span>
          <p>{this.getStringLong(loc)}</p>
        </span>  
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sys_state: state
})

Location.propTypes = {
  sys_state: PropTypes.object,
  loc: PropTypes.array
}

export default connect(mapStateToProps)(Location)


