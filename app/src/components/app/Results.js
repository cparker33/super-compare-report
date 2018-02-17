// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import shortid from 'shortid'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

// COMPONENTS
//import Sub_1 from './Results_Sub_1'
import Sub_A from './Results_Sub_A'


class Results extends Component {
  

  render() {

    const _props = this.props.sys_state.app_state
    const compare_data = _props.compare_data
    const data = compare_data.fail_data
    let size = 0, key
    for (key in data) {
      if (data.hasOwnProperty(key)){
        size++
      } 
    }

    return (

      <div className='res-component'>

        {
          (()=> {

            if (compare_data.is_loaded) {

              return (

                <div>
                  {
                    (()=> {
                      if (size > 0) {
                        return (
                          <div>
                            {
                              Object.entries(data).map(([key, val])=> {
                                if (key !== '_attributes') {
                                  return (
                                    <div key={shortid.generate()} className='lvl-0-main-wrap'>
                                      <p className='lvl-0-title'>Section: {key}</p>
                                      <Sub_A data={val} />
                                    </div>
                                  )
                                }
                              })
                            }
                          </div> 
                        )
                      } else {
                        return (

                          <div key={shortid.generate()} className='lvl-0-main-wrap'>
                            <p className='lvl-0-title'>No Errors Were Found</p>
                          </div>
                        )
                      }
                    })()
                  }
                </div>
              )
            } else {
              return (
                <div />
              )
            }
          })()
        }
      </div>
    )

  }
}


const mapStateToProps = state => ({
  sys_state: state
})

Results.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(Results)


