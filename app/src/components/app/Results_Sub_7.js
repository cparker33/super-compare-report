// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import shortid from 'shortid'
import changeCase from 'change-case'

// CPAR-STACK
import { elipsThis } from '../api/app'

// COMPONENTS
import Sub_3 from './Results_Sub_3'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

class Sub_7 extends Component {
  
  render() {

    const data = this.props.data

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
                        <div key={shortid.generate()} className='res-main-cat'>
                          <p className='lvl-3-title'>{section_title}</p>
                          <div>
                          {
                            (()=> {
                              if (_.isPlainObject(val)) {
                                return (
                                  <Sub_3 data={val} />
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
                                        <p>{ elipsThis(val[2]) }</p>
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
                                              <Sub_3 data={arr} />
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

Sub_7.propTypes = {
  sys_state: PropTypes.object,
  data: PropTypes.object
}

export default connect(mapStateToProps)(Sub_7)


