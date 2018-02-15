const init_state = {
  name: 'cpardat',

  file_data_a: {
    is_loaded: false,
    file_name: 'No File Selected',
    data: null
  },

  file_data_b: {
    is_loaded: false,
    file_name: 'No File Selected',
    data: null
  },

  compare_data: {
    is_loaded: false,
    data: null
  }

}


// DEV
const log = console.log // eslint-disable-line no-unused-vars


export function app_reducer(state = init_state, action) {
  
  switch (action.type) {


//  ....

    case 'LOAD_FILE_A_DATA':
      return {
        ...state,
        file_data_a: action.file_data_a
      }

//  ....

    case 'LOAD_FILE_B_DATA':
      return {
        ...state,
        file_data_b: action.file_data_b
      }

//  ....

    case 'LOAD_COMPARE_DATA':
      return {
        ...state,
        compare_data: action.compare_data
      }
      
//  ....

    default:
      return state

//  ....
  }
}
