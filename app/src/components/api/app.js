// DEPENDENCIES
require('babel-polyfill')
const dotProp = require('dot-prop')
import React from 'react'
import store from '../store/store'
import _ from 'lodash'
// import jsdiff from 'diff'
var jsdiff = require('diff')
import shortid from 'shortid'
import format from 'format-number'

// DEV
const log = console.log // eslint-disable-line no-unused-vars

export function loadFileAData(data) {
  store.dispatch({
    type: 'LOAD_FILE_A_DATA',
    file_data_a: data
  })
}

export function loadFileBData(data) {
  store.dispatch({
    type: 'LOAD_FILE_B_DATA',
    file_data_b: data
  })
}


export function getLoc(data) {
  return data.map((dat)=> {
    return (
      <p>{dat}</p>
    )
  })
}



export function getCompare(string_a, string_b) {
  let diff = jsdiff.diffChars(string_a, string_b)

  return (

    <div>
    {
      diff.map((part)=> {
        return (
          <span className='compare-text-diff' key={shortid.generate()} >
          {
            (()=> {
              if (part.added) {
                return (
                  <span style={{color: 'blue'}}>{part.value}</span>
                )
              } else if (part.removed) {
                return (
                  <span style={{color: 'red'}}>{part.value}</span>
                )
              } else {
                return (
                  <span style={{color: 'grey'}}>{part.value}</span>
                )
              }
            })()
          }
          </span>
        )
      })
    }
    </div>

  )
}



export function elipsThis(string) {

  let trimmedString
  if (string.length > 8000) {
    trimmedString = string.substring(0, 80)
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




export function compareFiles() {

  let _state = store.getState().app_state
  let file_a = JSON.parse( _state.file_data_a.data )
  let file_b = JSON.parse( _state.file_data_b.data )
  file_a = file_a.VALUATION_RESPONSE
  file_b = file_b.VALUATION_RESPONSE
  let compare_obj = file_a
  let fail_obj = {}
  let fail_arr = []

  function sub_1() {

    let path_arr = []
 //  Embedded File
      function sub_A() {

        this.typeCheck = (data, path) => { 
          if ( _.isPlainObject(data) ) {
            _.forIn(data, (val, key)=> {
              // log('A-KEY-> ', key)
              let new_path = path + '.' + key
              path_arr.push(key)
              let sub_b = new sub_B()
              sub_b.typeCheck(val, new_path)
            })
          } else if ( _.isArray(data) ) {
            _.each(data, (val, i)=> {
              let new_path = `${path}.${i}`
              let sub_b = new sub_B()
              sub_b.typeCheck(val, new_path)
            })
          } else if ( _.isString(data) ) { 
            let b_dat = dotProp.get(file_b, path)
            if (b_dat === undefined || b_dat === 'undefined') {
              b_dat = 'N/A'
            }
            if (data === b_dat) { 
              dotProp.set(compare_obj, path, ['cpar', true, data])
            } else {
              
              
              if (path.indexOf('EMBEDDED_FILE') === -1) {

                let temp_arr = []
                temp_arr.push(path)
                let sub_temp_arr = []
                sub_temp_arr.push( data )
                sub_temp_arr.push( b_dat )
                temp_arr.push(sub_temp_arr)
                if (data.length > 100) {
                  temp_arr.push( getCompare(data, b_dat) )
                } else {
                  temp_arr.push( '-' )
                }
                fail_arr.push(temp_arr)
                path_arr = []

                dotProp.set(compare_obj, path, ['cpar', false, [data, b_dat]])
                dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])

              }
              
              
            }
          }
        }

      }


      function sub_B() {

        this.typeCheck = (data, path) => { 
          if ( _.isPlainObject(data) ) {
            _.forIn(data, (val, key)=> {
              // log('B-KEY-> ', key)
              let new_path = path + '.' + key
              path_arr.push(key)
              let sub_a = new sub_A()
              sub_a.typeCheck(val, new_path)
            })
          } else if ( _.isArray(data) ) {
            _.each(data, (val, i)=> {
              let new_path = `${path}.${i}`
              let sub_a = new sub_A()
              sub_a.typeCheck(val, new_path)
            })
          } else if ( _.isString(data) ) { 
            let b_dat = dotProp.get(file_b, path)
            if (b_dat === undefined || b_dat === 'undefined') {
              b_dat = 'N/A'
            }
            if (data === b_dat) { 
              dotProp.set(compare_obj, path, ['cpar', true, data])
            } else {

              if (path.indexOf('EMBEDDED_FILE') === -1) {

                let temp_arr = []
                temp_arr.push(path)
                let sub_temp_arr = []
                sub_temp_arr.push( data )
                sub_temp_arr.push( b_dat )
                temp_arr.push(sub_temp_arr)
                if (data.length > 100) {
                  temp_arr.push( getCompare(data, b_dat) )
                } else {
                  temp_arr.push( '-' )
                }
                fail_arr.push(temp_arr)
                path_arr = []

                dotProp.set(compare_obj, path, ['cpar', false, [data, b_dat]])
                dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])
              
              }
              
            }
          }
        }

      }



    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          path_arr.push(key)
          let sub_a = new sub_A()
          sub_a.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          let sub_a = new sub_A()
          sub_a.typeCheck(val, new_path)
        })
      }
    }
  }

  let sub1 = new sub_1()

  _.forIn(file_a, (val_a_1, key_a_1)=> {
    sub1.typeCheck(val_a_1, key_a_1)
  })
  let compare_data = {
    is_loaded: true,
    data: compare_obj,
    fail_data: fail_arr
  }

  log('fail-> ', fail_arr)

  store.dispatch({
    type: 'LOAD_COMPARE_DATA',
    compare_data
  })
}


