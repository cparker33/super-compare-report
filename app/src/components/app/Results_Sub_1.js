// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import shortid from 'shortid'
import changeCase from 'change-case'

// COMPONENTS
import Sub_2 from './Results_Sub_2'

// DEV
const log = console.log // eslint-disable-line no-unused-vars


class Sub_1 extends Component {
  
  render() {
    
    const data = this.props.data

    return (
      <div className='res-component'>
        {
          Object.entries(data).map(([key, val])=> {

            let section_title = key === '_attributes' ? false : key

            if (section_title !== false) {
              section_title = changeCase.sentenceCase(section_title)
              section_title = changeCase.titleCase(section_title)
            }

            return (
              <div key={shortid.generate()} className='lvl-1-main-wrap'>
                <p className='lvl-1-title'>{section_title}</p>
                <div>
                  {
                    (()=> {
                      if (_.isPlainObject(val)) {
                        return (
                          <Sub_2 data={val} />
                        )
                      } else if (_.isArray(val)) {
                        if (val[0] == 'cpar') {
                          if (val[1]) {
                            return (
                              <div className='data-val-pass'>
                                <p>{val[2]}</p>
                              </div>
                            )
                          } else {
                            return (

                              <div className='data-val-fail'>
                                <p>{val[2][0]}</p>
                                <p>{val[2][1]}</p>
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
                                      <Sub_2 data={arr} />
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
}


const mapStateToProps = state => ({
  sys_state: state
})

Sub_1.propTypes = {
  sys_state: PropTypes.object,
  data: PropTypes.object
}

export default connect(mapStateToProps)(Sub_1)


