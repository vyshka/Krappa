var urlGet = "/api/vacancies/getallVacancies";
var urlSearch = "/api/vacancies/getallVacanciesWithSearch";
var urlDel = "/api/vacancies/DeleteVacancy/";
var urlEdit = "EditVacancy/";
var urlAdd = "/api/vacancies/CreateVacancy";
var table;
var spinner = new Spinner({ top:"30%" });


$(document).ready( function(){
    load();


    $("#createBtn").on("click", addVacancy);

    $(table).on("click", function(e) {
        var target = e.target;
        var id = target.closest("tr").getAttribute("data-vacancy-id");
        if (confirm('Вы действительно хотите удалить?')) {
            $.ajax({
                url: urlDel + id,
                type: 'DELETE'
            })
            .done(function() {
                $("table").find("tr[data-vacancy-id = '" + id + "']").remove();
            }) 
        }
    })
})


function load() {
    // var tbody = document.getElementById("table");
    // var opt = {
    //     top: "30%"
    // };
    // spinner = new Spinner(opt).spin(tbody);
    // setTimeout(getData(), 1000);
    table = document.getElementById("table");
    $.ajax({
        url: urlGet,
        beforeSend: function() {
            spinner.spin(table);
        },
        success: function(data) {
            spinner.stop();
            fillTable(data)
        }
    })
}


function fillTable(data) {
    for (index = 0, len = data.length; index < len; ++index) {
        $(table).append(createRow(data[index]))
    }
}


function createRow(item) {
    
    var deleteLink = $("<a ><span class = 'glyphicon glyphicon-trash'></span></a>");
    var editLink = $("<a href=" + urlEdit + item.vacancyId + "><span class = 'glyphicon glyphicon-edit span'></span></a>");
    var row = $("<tr data-vacancy-id = '" + item.vacancyId + "'>").append(
        $("<td>" + item.name + "</td>"),
        $("<td class = 'hidden-xs hidden-sm'>" + item.vacancyUrl + "</td>"),
        $("<td>" + item.City + "</td>"),
        $("<td>").append(deleteLink).append(editLink));
    return row;
                
}


function clearData() {
    var tbody = $("#table").find("tbody").empty();
    $("#url").val("");
    $("#city").val("");
    $("#name").val("");
}


function addVacancy() {
    var Vacancies = {
    vacancyId: 0,
    vacancyUrl: $("#url").val(),
    City: $("#city").val(),
    name: $("#name").val()
    }
    $.ajax({
        url: urlAdd,
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(Vacancies),
        success: function(data) {
            $(table).append(createRow(data));
        }
    })
}

// function search() {
//     var opt = {
//         top: "30%"
//     };
//     spinner = new Spinner(opt).spin($("#table"));
//     setTimeout(getSearchData(), 1000);

// }

// function getSearchData() {
//     $.ajax({
//         type: "POST",
//         url: urlSearch,
//         data: JSON.stringify($("#searchstring")),
//         contentType: "application/json",
//         dataType: "json"
//     })

// }