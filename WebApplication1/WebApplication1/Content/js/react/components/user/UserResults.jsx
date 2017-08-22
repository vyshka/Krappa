import React from 'React'

export class UserResults extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            model: {
                Results:[],
                UserName: ""
            }
        }
    }
    componentWillMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();

        $.ajax({
            url: "/api/result/GetResultsByUserId/" + id,
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var resultslist = this.state.model.Results.map(function(data, index) {
            return(
                <Result
                    key = {index}
                    item = {data}
                />
            )
        })
        return(
            <div>
                <h3>Результаты пользователя {this.state.model.UserName}</h3>
                <div className="list-group">
                    {resultslist}
                </div> 
            </div>
        )
    }
}

class Result extends React.Component {
    render() {
        return(
            <a 
                href={"/Admin/SurveyResult/" + this.props.item.id} 
                key={this.props.item.SurveyName} 
                className="list-group-item"
            >
                {this.props.item.SurveyName}: {this.props.item.CompliteTime}
            </a>
        )
    }
}