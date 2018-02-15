// DEPENDENCIES
require('babel-polyfill')
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import convert from 'xml-js'

// LOCAL-API
import { loadFileAData, loadFileBData } from '../api/app'

// MUI-STACK
import RaisedButton from 'material-ui/RaisedButton'

// DEV
const log = console.log // eslint-disable-line no-unused-vars


class ImportBtn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      file_loaded: false,
      is_a: null
    }
  }

  componentWillMount() {

    this.setState({ is_a: this.props.is_a})
  }


  handleChange = async (event)=> {

    let is_a = this.state.is_a,
      file_data = {
        file_name: 'filename',
        data: {}
      },
      file = event.target.files[0]

    file_data.file_name = file.name

    let reader = new FileReader()

    reader.onload = async function() {
      const getParsed = async ()=> {
        let parsed = await convert.xml2json(this.result, {compact: true, spaces: 4})
        return await parsed
      }
      let parsed = await getParsed()
      file_data.data = parsed
      file_data.is_loaded = true

      if (is_a) {
        loadFileAData(file_data)
      } else {
        loadFileBData(file_data)
      }
    }
    reader.readAsBinaryString(file)
  }

  handleClick() {
    this.fileInput.value = ''
    this.fileInput.click()
  }


  render() {

    const _props = this.props
    const file_data = _props.file_data


    return (

      <div id='pick-file-btn'>

        <input
          accept="text/xml"
          id="file"
          onChange={this.handleChange}
          ref={(input) => { this.fileInput = input }}
          style={{display: 'none'}}
          type="file" />

        <RaisedButton
          label={_props.label}
          disabled={file_data.is_loaded}
          onClick={ () => {this.handleClick()} }
          primary={true}  />

      </div>
    )
  }
}


const mapStateToProps = state => ({
  sys_state: state
})

ImportBtn.propTypes = {
  sys_state: PropTypes.object,
  file_data: PropTypes.object,
  label: PropTypes.string,
  is_a: PropTypes.bool
}

export default connect(mapStateToProps)(ImportBtn)


