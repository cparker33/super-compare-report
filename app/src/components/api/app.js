// DEPENDENCIES
require('babel-polyfill')
const dotProp = require('dot-prop')
import React from 'react'
import store from '../store/store'
import _ from 'lodash'
var jsdiff = require('diff')
import shortid from 'shortid'

var format = require('format-number')

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


  function sub_1() {

    let sub2 = new sub_2()

    this.typeCheck = (data, path) => { 

      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub2.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub2.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        // ...
      }
    }
  }




  function sub_2() {

    let sub3 = new sub_3()

    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub3.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub3.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', false, [data, b_dat]])
          dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])
          
        }
      }
    }

  }



  function sub_3() {

    let sub4 = new sub_4()

    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub4.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub4.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', false, [data, b_dat]])
          dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])
        }
      }
    }
  }


  function sub_4() {

    let sub5 = new sub_5()

    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub5.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub5.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', true, [data, b_dat]])
          dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])
        }
      }
    }
  }


  function sub_5() {
    let sub6 = new sub_6()
    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub6.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub6.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', true, [data, b_dat]])
          dotProp.set(fail_obj, path, ['cpar', false, [data, b_dat]])
        }
      }
    }
  }


  function sub_6() {
    let sub7 = new sub_7()
    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        _.forIn(data, (val, key)=> {
          let new_path = path + '.' + key
          sub7.typeCheck(val, new_path)
        })
      } else if ( _.isArray(data) ) {
        _.each(data, (val, i)=> {
          let new_path = `${path}.${i}`
          sub7.typeCheck(val, new_path)
        })
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', true, [data, b_dat]])
        }
      }
    }
  }


  function sub_7() {
    // let sub8 = new sub_8()
    this.typeCheck = (data, path) => { 
      if ( _.isPlainObject(data) ) {
        // ...
      } else if ( _.isArray(data) ) {
        // ...
      } else if ( _.isString(data) ) { 
        let b_dat = dotProp.get(file_b, path)
        if (b_dat === undefined || b_dat === 'undefined') {
          b_dat = 'N/A'
        }
        if (data === b_dat) { 
          dotProp.set(compare_obj, path, ['cpar', true, data])
        } else {
          dotProp.set(compare_obj, path, ['cpar', true, [data, b_dat]])
        }
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
    fail_data: fail_obj
  }

  store.dispatch({
    type: 'LOAD_COMPARE_DATA',
    compare_data
  })
}


