// DEPENDENCIES
import React, { Component } from 'react'
import changeCase from 'change-case'
import {connect} from 'react-redux'
import format from 'format-number'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import _ from 'lodash'

// MUI-STACK
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// API
import { getLoc } from '../api/app.js'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

const dialog_style = {
  file_dialog_wrap: {
    height: '550px',
    overflowY: 'scroll'
  },
  file_dialog_sect_a: {
    width: '48%',
    borderRight: '1px solid #EEE',
    borderLeft: '1px solid #EEE',
    height: 'auto'
  },
  file_dialog_sect_b: {
    width: '48%',
    borderLeft: '1px solid #EEE',
    borderRight: '1px solid #EEE',
    height: 'auto'
  },
  sect_title: {
    fontSize: '18px',
    padding: '5px',
  },
  sect_body: {
    fontSize: '14px',
    padding: '5px',
  },

  dialog: {
    width: '99%',
    maxWidth: 'none'
  },

}




class Compare extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }  

  handleOpen = ()=> {
    this.setState({open: true});
  }

  handleClose = ()=> {
    this.setState({open: false});
  }

  getString = (string)=> {
    let new_string = '',
        section_title = '',
        arr = string.split('.'),
        text = ''
        
    text = changeCase.sentenceCase(arr[0])
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
    
    arr.forEach((lo)=> {
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
    if (string.length > 20) {
      trimmedString = string.substring(0, 18)
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

    let data = this.props.data[2]

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div className='comp-compare-main'>

      <span>

      {
        (()=> {
          if (data === '-') {
            return (
              <div className='file-button-disabled'>
                <span key={shortid.generate()}>

                  <i className="fa fa-eye-slash" />
                </span>
              </div>
            )
          } else {
            return (
              <div className='file-button' onClick={this.handleOpen}>
                <span key={shortid.generate()}>

                  <i className="fa fa-eye" />
                </span>
              </div>
            )
          }
        })()
      }

      </span> 

        



        <Dialog title="Comparison" actions={actions}
          modal={true}
          contentStyle={dialog_style.dialog}
          open={this.state.open}>

          <div style={dialog_style.file_dialog_wrap}>

            <span>
              <p>{data}</p>
            </span> 

          </div>

        </Dialog>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  sys_state: state
})

Compare.propTypes = {
  sys_state: PropTypes.object,
  data: PropTypes.array,
}

export default connect(mapStateToProps)(Compare)


