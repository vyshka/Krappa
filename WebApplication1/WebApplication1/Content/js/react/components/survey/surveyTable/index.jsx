import React from 'React'
import { THead } from './THead.jsx'
import { RowList } from './RowList.jsx'



export class SurveyTable extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        this.deleteFromState = this.deleteFromState.bind(this)
    }

    componentDidMount() {
        this.loadList()
    }


    deleteFromState(elementId) {
        var newData = this.state.data
        var deleteIndex;
        newData.some(function(element, index) {
            if(element.Id == elementId) {
                newData.splice(index, 1)
                return true
            }
        }, this);
        this.setState({
            data: newData
        })
    }

    loadList() {
        var spinner = new Spinner({ top:"100%" });
        var table = document.getElementById("table");
        var self = this
        $.ajax({
            url: "/surveys",
            method: 'GET',
            dataType: 'JSON',
            beforeSend: function() {
                spinner.spin(table);
            },
            success: function(list) {
                spinner.stop();
                this.setState({data: list});
            }.bind(this)
        })
    }


    render() {
        var thList = ["Название", "Ответов", "Ссылка на опрос", "Изменён", "Результаты", "Действия"]

        return(
            <div>
                <a href="/Admin/CreateSurvey" className="btn btn-default">Создать</a>
                <div className="panel panel-default panel-table">
                    <div className="panel-body" id="table">
                        <table className='table table-striped table-bordered table-list'>
                            <THead th = {thList}/> 
                            <RowList 
                                editUrl = {this.props.editUrl} 
                                delete = {this.deleteFromState} 
                                data = {this.state.data} 
                                url = {this.props.url} 
                                deleteUrl = {this.props.deleteUrl}
                                />   
                        </table>
                    </div>
                </div> 
            </div> 
        )
    }
}





