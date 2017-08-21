import React from 'React'



export class SurveyTable extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            data: [ ]
        }

        this.deleteFromState = this.deleteFromState.bind(this)
        this.loadcount = this.loadcount.bind(this)
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

    loadcount() {
        $.ajax({
            url: "/api/Result/GetResultsCount",
            dataType: 'JSON',
            success: function(data) {
                var newData = this.state.data
                newData.forEach(function(element) {     
                    element.ResultCount = 0;
                    data.forEach(function(listElement) {
                        if(element.Id == listElement.SurveyId) {                            
                            element.ResultCount = listElement.Count
                        }
                    })
                    
                }, this);
                this.setState({
                    data: newData
                })
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

class THead extends React.Component {
    render() {
        var thList = this.props.th.map(function(element) {
            return(
                <th key = {element}>
                    {element}
                </th>
            )
        })
        return(
            <thead>
                <tr >
                    {thList}
                </tr>
            </thead>
        )
    }
}

class RowList extends React.Component {
    render() {
        var self = this 
        var rowNodes = this.props.data.map(function(element) {
            return (
                <Row 
                    editUrl = {self.props.editUrl} 
                    delete = {self.props.delete}
                    deleteUrl = {self.props.deleteUrl} 
                    key = {element.Id} 
                    row = {element} 
                />
            )
        })
        return (
            <tbody>
                {rowNodes}
            </tbody>
        )
    }
}

class Row extends React.Component {
    render() {
        var rowColumns = [];
        rowColumns.push(<td key = {this.props.row.name} >{this.props.row.name}</td>);
        rowColumns.push(<td key = {"ResultCount" + this.props.row.ResultCount} >{this.props.row.ResultCount}</td>);
        rowColumns.push(<td key = {"/Home/Survey/" + this.props.row.Id} >
                            <a href={"/Home/Survey/" + this.props.row.Id}> 
                                Ссылка
                            </a>
                        </td>);
        rowColumns.push(<td key = {this.props.row.updateTime} >{this.props.row.updateTime}</td>);
        rowColumns.push(
            <td key = {"/Admin/Stat/" + this.props.row.Id}>
                <a href= {"/Admin/Stat/" + this.props.row.Id}>
                    Результаты
                </a>
            </td>
        )
        
        return(
            <tr key = {this.props.row.Id}>
                {rowColumns}
                <Links 
                    deleteUrl = {this.props.deleteUrl}
                    delete = {this.props.delete}
                    editUrl = {this.props.editUrl}
                    id = {this.props.row.Id} />
            </tr>
        )
    }
}


class Links extends React.Component{    
    render() {
        return(
            <td>
                <DeleteLink 
                    deleteUrl = {this.props.deleteUrl} 
                    delete = {this.props.delete} 
                    id = {this.props.id}
                />
                <EditLink 
                    editUrl = {this.props.editUrl} 
                    id = {this.props.id}
                />
            </td>
        )
    }
}

class DeleteLink extends React.Component{
    constructor(props) {
        super(props)      
        this.handleClick = this.handleClick.bind(this); 
    }

    render() {
        return(
            <a onClick={this.handleClick} >
                <span className = 'glyphicon glyphicon-trash' />
            </a>
        )
    }

    handleClick() {
        var deleteAct = this.props.delete;
        var deleteUrl = this.props.deleteUrl;
        var id = this.props.id
        if(confirm("Вы дейстивтельно хотите удалить?")) {
            $.ajax({
                url: deleteUrl + id,
                type: 'DELETE',
                success: function(result) {
                    if(result == false) {
                        alert("Ошибка при удалении")
                    } else {
                        deleteAct(id)
                    }
                    
                }
            })
        }
    }
}

class EditLink extends React.Component{
    render() {
        return(
            <a href={this.props.editUrl + this.props.id}>
                <span className="glyphicon glyphicon-edit"></span>
            </a>
        )
    }
}