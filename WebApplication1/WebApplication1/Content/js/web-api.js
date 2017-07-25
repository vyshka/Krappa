var urlget = "/api/vacancies/getallVacancies";
var urldel = "/api/vacancies/DeleteVacancy/";
var urledit = "EditVacancy/";
var spinner;
$(document).ready( function(){
    load();
})
function load() {
    var tbody = document.getElementById("table");
    var opt = {
        top: "106%"
    };
    spinner = new Spinner(opt).spin(tbody);
    setTimeout(getData, 1000);
}
function getData() {
    $.getJSON(urlget)
        .done(function (data) {
            spinner.stop();
            $.each(data, function (key, item) {
                var deleteLink = $("<a>").on("click", function () {
                    if (confirm('Вы действительно хотите удалить?')) {
                        $.ajax({
                            url: urldel + item.vacancyId,
                            type: 'DELETE',
                            success: clearData
                        });
                    }

                });

                var editLink = $("<a>").attr("href", urledit + item.vacancyId);
                
                $("<span />").addClass("glyphicon glyphicon-trash").appendTo(deleteLink);
                $("<span />").addClass("glyphicon glyphicon-edit").appendTo(editLink);

                $("<tr>").append(
                    $("<td>").text(item.name),
                    $("<td>").text(item.vacancyUrl).addClass("hidden-xs hidden-sm"),
                    $("<td>").text(item.City),
                    $("<td>").append(deleteLink).append(editLink)
                    ).appendTo($("table"));
                
            })
        })

}
function clearData() {
    var tbody = $("#table").find("tbody").empty();
    load();
}
