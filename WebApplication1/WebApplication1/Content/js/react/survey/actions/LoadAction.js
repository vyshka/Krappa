import { LOAD_DATA } from '../constants/index.js'

export function loadData(data) {
    return (dispatch) =>  {
        let data = loadList()
        dispatch({
            type: LOAD_DATA,
            data: data
        })

    }
}

function loadList() {
    var returnV;
    $.ajax({
        url: "/api/Survey/GetAllSurveys",
        dataType: 'JSON',
        success: function(list) {
            console.log(list)
            returnV = list
        }
    })
    return returnV;
}
