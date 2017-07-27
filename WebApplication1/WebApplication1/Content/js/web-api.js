var table;

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
                    url: "/api/vacancies/DeleteVacancy/" + id,
                    type: 'DELETE',
                    beforeSend: function() {
                        $(tr).addClass("inactive").attr("status", "false");
                        $(spans).addClass("inactive");
                        removedhref = $(spans[1]).closest("a").attr("href");
                        $(spans[1]).closest("a").removeAttr("href");
                    },
                    success: function(result) {
                        if(result == true) {
                            $("table").find("tr[data-vacancy-id = '" + id + "']").remove();
                        } 
                        else {
                            $(tr).removeClass("inactive").attr("status", "true");
                            $(spans).removeClass("inactive");
                            $(spans[1]).closest("a").attr("href", removedhref);
                            alert("Ошибка");
                        }
                    
                    }
                })
            }
        }
        
    })


    $("#searchString").keyup(function() {
        var searchValue = this.value.toLowerCase();
        $("tbody tr").each(function() {
            $("tbody tr").each(function() {
                var stringData = $(this).text().toLowerCase();
                var not_found = (stringData.indexOf(searchValue) == -1);
                $(this).closest('tr').toggle(!not_found);
            })

        })
    })
})

function load() {
    table = document.getElementById("table");
    var spinner = new Spinner({ top:"30%" });
    $.ajax({
        url: "/api/vacancies/getallVacancies",
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
    var editLink = $("<a href = EditVacancy/" + item.vacancyId + "><span class = 'glyphicon glyphicon-edit'></span></a>");
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
        url: "/api/vacancies/CreateVacancy",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(Vacancies),
        success: function(data) {
            $(table).append(createRow(data));
            clearData();
        }
    })
}
