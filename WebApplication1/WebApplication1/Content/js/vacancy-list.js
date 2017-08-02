class Tbody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                vacancyId: null,
                vacancyUrl: null,
                City: null,
                name: null
                }
            ]
        }
    }

    render() {
        return (

            <table className='table table-striped table-bordered table-list'>
                <thead>
                    <th>Название</th>
                    <th className='hidden-xs hidden-sm'>Url</th>
                    <th>Город</th>
                    <th>Действия</th>
                </thead>
                <RowList data = {this.state.data} />
                
            </table>
        );
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
                this.setState({data: list});
            }.bind(this)
        })
    }
}


class RowList extends React.Component{
    render() {
        var rowNodes = this.props.data.map(function(element) { 
            return (
                <Row key={element.vacancyId} row={element} />
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
                <Links vacancyId = {this.props.row.vacancyId}/>
            </tr>
        )
    }
}

class Links extends React.Component{    
    render() {
        return(
            <td>
                <DeleteLink vacancyId = {this.props.vacancyId} />
                <EditLink vacancyId = {this.props.vacancyId} />
            </td>
        )
    }
}

class DeleteLink extends React.Component{
    constructor(props){
        super(props);
        
        this.deleteClick = this.deleteClick.bind(this); 

    }

    render() {
        return(
            <a onClick={this.DeleteClick} >
                test
                <span className = 'glyphicon glyphicon-trash' />
            </a>
        )
    }

    deleteClick(e) {
        e.preventDefault();
        alert("krappaG");
        // $.ajax({
        //     url: "/api/vacancies/DeleteVacancy/" + this.props.vacancyId,
        //     type: 'DELETE',
        //     beforeSend: function() {

        //     },
        //     success: function(result) {
        //     }
        // })
    }
}

class EditLink extends React.Component{
    render() {
        return(
            <a href = {"EditVacancy/" + this.props.vacancyId}>
                <span className = 'glyphicon glyphicon-edit'></span>
            </a>
        )
    }
}

ReactDOM.render(
    <Tbody url="/api/vacancies/getallVacancies" />,
    document.getElementById('table')
)