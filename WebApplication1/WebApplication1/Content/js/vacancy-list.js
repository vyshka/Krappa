class Content extends React.Component{  
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
        var index = this.state.data.indexOf(element);
        var newData = this.state.data;
        newData.splice(index, 1);
        this.setState({data: newData});
    }

    componentDidMount() {
        var table = document.getElementById("table");
        this.loadList();
    }

    loadList() {
        var spinner = new Spinner({ top:"30%" });
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
        return (
            <div>
                <div className="panel panel-default panel-table">
                    <div className="panel-body" id="table">
                        <table className='table table-striped table-bordered table-list'>
                            <THead th = {this.state.keysList}/> 
                            <RowList url = {this.props.url}/>   
                        </table>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className = "col-md-8">
                        <AddVacancyForm add = {this.addToState}/>
                    </div>
                </div>
            </div>
        );
    }

    
}

class THead extends React.Component{
    render() {
        var thList = this.props.th.map(function(element) {
            return(
                <th key = {element} >{element}</th>
            )
        });
        thList.push(<th>Действия</th>);
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
        var deleteProp = this.props.delete;
        var rowNodes = this.props.data.map(function(element) { 
            return (
                <Row delete = {this.deleteFormState} key = {element.vacancyId} row = {element} />
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
        return(
            <tr>                
                <td>{this.props.row.name}</td>
                <td className="hidden-xs hidden-sm">{this.props.row.vacancyUrl}</td>
                <td>{this.props.row.City}</td>
                <Links delete = {this.props.delete} id = {this.props.row.vacancyId}/>
            </tr>
        )
    }
}

class Links extends React.Component{    
    render() {
        return(
            <td>
                <DeleteLink delete = {this.props.delete} id = {this.props.id} />
                <EditLink id = {this.props.id} />
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
        if(confirm("Вы дейстивтельно хотите удалить?")) {
            $.ajax({
                url: "/api/vacancies/DeleteVacancy/" + this.props.id,
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
            <a className="fancybox" data-fancybox data-type="ajax" data-src={"/api/Vacancies/GetVacancyById/" + this.props.id}>
                <span className="glyphicon glyphicon-edit"></span>
            </a>
        )
    }
}

class AddVacancyForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var addProp = this.props.add;
        var Vacancies = {
            vacancyId: 0,
            vacancyUrl: document.getElementById("url").value,
            City: document.getElementById("city").value,
            name: document.getElementById("name").value
        }

        $.ajax({
            url: "/api/vacancies/CreateVacancy",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(Vacancies),
            success: function(data) {
                Vacancies.id = data;
                addProp(Vacancies);
                document.getElementById("name").value = "";
                document.getElementById("city").value = "";
                document.getElementById("url").value = "";
            }
        })
    }

    render() {
        return(
            <form className="form-horizontal">
                <h3>Добавить вакансию</h3>
                <div className="form-group">
                    <label className="col-md-2 control-label">Название</label>
                    <div className="col-md-10">
                        <input id="name" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Город</label>
                    <div className="col-md-10">
                        <input id="city" className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Url</label>
                    <div className="col-md-10">
                        <input id="url" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-2 col-md-10">
                        <button onClick={this.handleClick} type="button" id="createBtn" className="btn btn-default" >Добавить</button>                    
                    </div>
                </div>
            </form>
        )
    }
}

var ColumnNames = ["Название", "Url", "Город"];
ReactDOM.render(
    
    <Content 
        url="/api/vacancies/getallVacancies"
        th = {ColumnNames} 
         />,
    document.getElementById('content')
)
