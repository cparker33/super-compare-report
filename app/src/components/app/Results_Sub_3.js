// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import shortid from 'shortid'
import changeCase from 'change-case'

// CPAR-STACK
import { elipsThis, getCompare } from '../api/app'

// COMPONENTS
import Sub_4 from './Results_Sub_4'

// DEV
const log = console.log // eslint-disable-line no-unused-vars


class Sub_3 extends Component {
  
  render() {

    const _props = this.props.sys_state.app_state
    const data = this.props.data
    const file_a_name = _props.file_data_a.file_name
    const file_b_name = _props.file_data_b.file_name

    return (

      <div className='res-component'>
      
        {
          (()=> {


            if (_.isPlainObject(data)) {

              return (
                <div>
                  {
                    Object.entries(data).map(([key, val])=> {
                      let section_title = key === '_attributes' ? false : key
              
                      if (section_title !== false) {
                        section_title = changeCase.sentenceCase(section_title)
                        section_title = changeCase.titleCase(section_title)
                      }
                      return (
                        <div key={shortid.generate()} className='lvl-3-main-wrap'>
                          <p className='lvl-3-title'>{section_title}</p>
                          <div>
                          {
                            (()=> {
                              if (_.isPlainObject(val)) {
                                return (
                                  <Sub_4 data={val} />
                                )
                              } else if (_.isArray(val)) {
                                if (val[0] == 'cpar') {
                                  
                                  if (val[1]) {
                                    return (
                                      <div className='data-val-pass'>
                                        <p>{ elipsThis(val[2]) }</p>
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div className='data-val-fail'>
                                        <div className='file-a-fail-wrap'>
                                          <h3>File A: {file_a_name}</h3>
                                          <p>{ elipsThis(val[2][0])  }</p>
                                        </div>
                                        <div className='file-b-fail-wrap'>
                                          <h3>File B: {file_b_name}</h3>
                                          <p>{ elipsThis(val[2][1])  }</p>
                                        </div>
                                        <div>
                                          {
                                            (()=> {
                                              if (val[2][0].length > 1000 && val[2][0].length < 8000) {
                                                return (
                                                  <div className='file-b-fail-wrap'>
                                                    <h3>Compared</h3>
                                                    <span>{ getCompare(val[2][1], val[2][0]) }</span>
                                                  </div>
                                                )
                                              }
                                            })()
                                          }
                                        </div>
                                      </div>
                                    )
                                  }
                                } else {
                                  return (
                                    <div>
                                      {
                                        val.map((arr)=> {
                                          if (_.isPlainObject(arr)) {
                                            return (
                                              <Sub_4 data={arr} />
                                            )
                                          }
                                        })
                                      }
                                    </div>
                                  )
                                }
                              }
                            })()
                          }                            
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
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

Sub_3.propTypes = {
  sys_state: PropTypes.object,
  data: PropTypes.object
}

export default connect(mapStateToProps)(Sub_3)


