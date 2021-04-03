const apis = {
    GET_UNIVERSITY: process.env.VUE_APP_API_BASE_URL + '/university/filter',
    CREATE_OR_UPDATE_UNIVERSITY: process.env.VUE_APP_API_BASE_URL + '/university/create_or_update',
    DELETE_UNIVERSITY: process.env.VUE_APP_API_BASE_URL + '/university/delete',
}
  
export default apis