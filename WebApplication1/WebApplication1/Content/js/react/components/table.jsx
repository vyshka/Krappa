import React from 'React'

import {AddVacancyForm, AddUserForm} from './survey/addForm.jsx'



export class DisplayTable extends React.Component{  
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            keysList: []
        }

        this.deleteFormState = this.deleteFormState.bind(this);
        this.addToState = this.addToState.bind(this)
    }

    addToState(element) {
        var newData = this.state.data;
        newData.push(element);
        this.setState({data: newData});

    }

    deleteFormState(element) {        
        let tempArray = [];
        for(var i = 0; i < this.state.data.length; i++) {
            var item = {
                Id: this.state.data[i].Id,
                number: i 
            }

            tempArray.push(item);
        }
        var index;
        for(var i = 0; i < tempArray.length; i++) {
            if(element.Id == tempArray[i].Id) {
                index = tempArray[i].number;
            }
        }
        var newData = this.state.data;
        newData.splice(index, 1);
        this.setState({data: newData});
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        var spinner = new Spinner({ top:"30%" });
        var table = document.getElementById("table");
        $.ajax({
            url: this.props.url,
            dataType: 'JSON',
            beforeSend: function() {
                spinner.spin(table);
            },
            success: function(list) {
                spinner.stop();
                var keyList = Object.keys(list[0]);
                keyList.shift();
                this.setState({data: list, keysList: keyList});
            }.bind(this)
        })
    }

    render() {
        var addForm;
        if(this.props.isVacancy) {
            addForm = <AddVacancyForm add = {this.addToState} />
        }
        if(this.props.isUser) {
            addForm = <AddUserForm add = {this.addToState} />
        }
        return(
            <div>
                <div className="panel panel-default panel-table">
                    <div className="panel-body" id="table">
                        <table className='table table-striped table-bordered table-list'>
                            <THead th = {this.state.keysList}/> 
                            <RowList 
                                editUrl = {this.props.editUrl} 
                                delete = {this.deleteFormState} 
                                data = {this.state.data} 
                                url = {this.props.url} 
                                deleteUrl = {this.props.deleteUrl}
                                isUser = {this.props.isUser}    
                            />   
                        </table>
                    </div>
                </div>
                <br />
                {addForm}
            </div>   
        )
    }

    
}

DisplayTable.defaultProps = {
    isUser: false,
    isVacancy: false
}

class THead extends React.Component{
    constructor(props) {
        super(props)
        this.renameTh = this.renameTh.bind(this)
    }
    renameTh(element) {
        switch(element) {
            case 'userName':
            case 'Name':
                element = 'Имя'
                break;
            case 'registerTime':
                element = 'Время регистрации'
                break;
            case 'City':
                element = 'Город'
                break;
            case 'SurveyCount':
                element = 'Опросов'
        }  
        return element;
    }


    render() {
        var self = this
        var thList = this.props.th.map(function(element, index) {
            element = self.renameTh(element)
                return(
                    <th key = {element} >
                        {element}
                    </th>
                )
            });
        if(this.props.th.length != 0) {
            thList.push(<th key={"operations"}>Действия</th>);
        }
        return(
            <thead>
                <tr>
                    {thList}
                </tr>
            </thead>
        )
    }
}

class RowList extends React.Component{
    
    render() {
        let self = this
        var deleteProp = this.props.delete;
        var deleteUrl = this.props.deleteUrl;
        let editUrl = this.props.editUrl;
        var rowNodes = this.props.data.map(function(element) { 
            return (
                <Row
                    editUrl = {self.props.editUrl} 
                    deleteUrl = {self.props.deleteUrl} 
                    delete = {self.props.delete} 
                    key = {element.Id} 
                    row = {element} 
                    isUser = {self.props.isUser}
                />
            );
        });
        return(
            <tbody>
                 {rowNodes} 
            </tbody>
        )
    }
}

class Row extends React.Component{
    render() {
        var rowColumns = [];
        for(var key in this.props.row) {
            if(key != "Id" && key != "SelectedRoleId") {
                rowColumns.push(<td key = {key}>{this.props.row[key]}</td>)
            }
        }
        return(
            <tr>                
                {rowColumns}
                <Links editUrl = {this.props.editUrl} deleteUrl = {this.props.deleteUrl} delete = {this.props.delete} id = {this.props.row.Id}/>
            </tr>
        )
    }
}

class Links extends React.Component{    
    render() {
        return(
            <td>
                <DeleteLink deleteUrl = {this.props.deleteUrl} delete = {this.props.delete} id = {this.props.id} />
                <EditLink editUrl = {this.props.editUrl} id = {this.props.id} />
            </td>
        )
    }
}

class DeleteLink extends React.Component{
    constructor(props) {
        super(props);        
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
        if(confirm("Вы дейстивтельно хотите удалить?")) {
            $.ajax({
                url: deleteUrl + this.props.id,
                type: 'DELETE',
                success: function(result) {
                    deleteAct(result);
                }
            })
        }
    }
}

class EditLink extends React.Component{
    render() {
        return(
            <a className="fancybox" data-fancybox data-type="ajax" data-src={this.props.editUrl + this.props.id}>
                <span className="glyphicon glyphicon-edit"></span>
            </a>
        )
    }
}
