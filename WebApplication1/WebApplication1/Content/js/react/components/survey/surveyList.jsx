import React from 'React'

export class SurveyList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            model: []
        }
    }
    componentWillMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();

        $.ajax({
            url: "/api/survey/GetAllSurveys/",
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var resultslist = this.state.model.map(function(data, index) {
            return(
                <Survey
                    key = {index}
                    item = {data}
                />
            )
        })
        return(
            <div>
                <div className="list-group">
                    {resultslist}
                </div> 
            </div>
        )
    }
}

class Survey extends React.Component {
    render() {
        return(
            <a 
                href={"/Home/Survey/" + this.props.item.Id} 
                key={this.props.item.SurveyName} 
                className="list-group-item"
            >
                {this.props.item.Name} вопросов: {this.props.item.Questions.length}
            </a>
        )
    }
}