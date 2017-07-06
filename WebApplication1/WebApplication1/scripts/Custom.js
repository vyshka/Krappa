function deleteRow(id)
{
    var r = confirm("Вы действительно хотите удалить пользователя?");
    if (r = true)
    {
        window.location.assign("/Admin/Delete/" + id);
    }
}