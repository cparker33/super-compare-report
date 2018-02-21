// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// MUI-STACK
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

// LOCAL-API
import { compareFiles } from '../../components/api/app'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

// COMPONENTS
import ImportBtn from '../../components/app/ImportBtn'
import TableResults from '../../components/app/TableResults'


class HomePage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cal: 'par',
      file_name_a: 'No File Selected',
      file_name_b: 'No File Selected'
    }
  }

  componentDidMount() {
    // window.scrollTo(0, 0)
  }

  handleClick() {
    compareFiles()
  }


  render() {

    const _props = this.props.sys_state.app_state
    const file_data_a = _props.file_data_a
    const file_data_b = _props.file_data_b
    let both_loaded = false

    if (file_data_a.is_loaded && file_data_b.is_loaded) {
      both_loaded = true
    }

    return (

      <div className='app-component-wrapper'>
        <div className='button-wrapper-main'>
          <Toolbar style={{height: '60px', backgroundColor: '#37474f'}} >
            <ToolbarGroup firstChild={true} >
              <ToolbarTitle text='Super Awesome Report Comparing Program' 
                className='app-title' 
                style={{color: '#C2C2C2', paddingLeft: '20px'}} />
            </ToolbarGroup>
          </Toolbar>

          <div className='load-file-outter-wrap'>
            <div id='pick-file-btn' className='load-file-inner-wrap'>
              <div className='import-btn-wrapper'>
                <ImportBtn file_data={file_data_a} 
                  label='Load File A'
                  is_a={true} 
                />
              </div>
              <p>{_props.file_data_a.file_name}</p>
            </div>
            <div id='pick-file-btn' className='load-file-inner-wrap'>
              <div className='import-btn-wrapper'>
                <ImportBtn file_data={file_data_b}
                  label='Load File B'
                  is_a={false} 
                />
                <p>{_props.file_data_b.file_name}</p>
              </div>
            </div>
          </div>

          <div className='compare-btn-wrapper'>

            <RaisedButton
              label='Compare'
              disabled={!both_loaded}
              onClick={ () => { this.handleClick() } }
              primary={true}  
            />

            <RaisedButton
              label='Reset'
              onClick={ () => { location.reload() } }
              primary={false}  
            />

          </div>
        </div>

        <TableResults />

        <BottomNavigation style={{backgroundColor: '#C3C8C9'}}>
          <div className='bottom-bar' style={{marginTop: '10px', marginLeft: '10px'}}>
            <a href='https://github.com/cparker33' style={{textDecoration: 'none'}}>
              <i className='fa fa-github' style={{fontSize: '30px', color: '#000'}} />
              <span style={{marginTop: '-10px', marginLeft: '10px', color: '#000'}}>Caleb Parker</span>
            </a>
          </div>
        </BottomNavigation>

      </div>

    )
  }
}

const mapStateToProps = state => ({
    sys_state: state
})

HomePage.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(HomePage)
