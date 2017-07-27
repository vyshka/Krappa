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
        if(target.className == "glyphicon glyphicon-trash") {
            var tr = target.closest("tr");
            var id = tr.getAttribute("data-vacancy-id");
            var removedhref;
            var spans = $(tr).find("span");
            if (confirm('Вы действительно хотите удалить?') && tr.getAttribute("data-status") == "true") {
                $.ajax({
                    url: urlDel + id,
                    type: 'DELETE',
                    beforeSend: function() {
                        $(tr).addClass("inactive-tr").attr("status", "false");
                        $(spans[0]).addClass("inactive-span");
                        $(spans[1]).addClass("inactive-span");
                        removedhref = $(spans[1]).closest("a").attr("href");
                        $(spans[1]).closest("a").removeAttr("href");
                    },
                    success: function(result) {
                        if(result == true) {
                            $("table").find("tr[data-vacancy-id = '" + id + "']").remove();
                        } 
                        else {
                            $(tr).removeClass("inactive-tr").attr("status", "true");
                            $(spans[0]).removeClass("inactive-span");
                            $(spans[1]).removeClass("inactive-span");
                            $(spans[1]).closest("a").attr("href", removedhref);
                            alert("Ошибка");
                        }
                    
                    }
                })
            }
        }
        
    })
})


function load() {
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
    
    var deleteLink = $("<a><span class = 'glyphicon glyphicon-trash'></span></a>");
    var editLink = $("<a href=" + urlEdit + item.vacancyId + "><span class = 'glyphicon glyphicon-edit'></span></a>");
    var row = $("<tr data-vacancy-id = '" + item.vacancyId + "' data-status = true>").append(
        $("<td>" + item.name + "</td>"),
        $("<td class = 'hidden-xs hidden-sm'>" + item.vacancyUrl + "</td>"),
        $("<td>" + item.City + "</td>"),
        $("<td>").append(deleteLink).append(editLink));
    return row;
                
}


function clearData() {
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
            clearData();
        }
    })
}
