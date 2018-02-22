// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import shortid from 'shortid'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

// CPAR-STACK
import { getLoc } from '../api/app.js'

// COMPONENTS
import Sub_A from './Results_Sub_A'
import Location from './Location'
import FileData from './FileData'
import Compare from './Compare'


class TableResults extends Component {
  

  render() {

    const _props = this.props.sys_state.app_state
    const compare_data = _props.compare_data
    const data = compare_data.fail_data
    

    return (

      <div className='res-component'>

        {
          (()=> {

            if (compare_data.is_loaded) {

              return (

                <div>
                  {
                    (()=> {
                      if (data.length > 0) {
                        return (
                          <div>
                            <table className='c-table'>
                              <thead>
                                <tr>
                                  <th>
                                    Location
                                  </th>
                                  <th>
                                    File A
                                  </th>
                                  <th>
                                    File B
                                  </th>
                                  <th>
                                    Comparison
                                  </th>
                                </tr>
                              </thead>
                              <tbody>

                              {
                                data.map((row)=> {
                                  return (
                                    <tr key={shortid.generate()}>

                                      <td>
                                        <Location loc={row} />
                                      </td>
                                
                                      <td>
                                        <FileData data={row} set={0} />
                                      </td>

                                      <td key={shortid.generate()} >
                                        <FileData data={row} set={1} />
                                      </td>

                                      <td key={shortid.generate()} >
                                        <Compare data={row} />
                                      </td>

                                    </tr>
                                  )
                                })
                              }

                              

                              </tbody>
                            </table>

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
              return (<div />)
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

TableResults.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(TableResults)


