import React from 'React'
import SaladUI from 'salad-ui'

export class Stat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                QuestionStat: [],
                Name: ""
            }
        }
    }

    componentDidMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();
        

        $.ajax({
            url: "/api/Survey/GetSurveyStat/" + id,
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var questionList = this.state.model.QuestionStat.map(function(element) {
            return(
                <Question 
                    key = {element.Text}
                    question = {element}
                />
            )
        })
        return(
            <div>
                <h3>
                    {this.state.model.Name}
                </h3>
                {questionList}
            </div>
        )
    }
}

class Answer extends React.Component {
    render() {
        return(
            <div>
                <SaladUI.Chart.BarMetric
                    label={this.props.answer.Text} 
                    percent={this.props.answer.Percent}
                    value={this.props.answer.Count}
                    metricName="Ответов"
                />
            </div>
                    

        )
    }
}

class Question extends React.Component {
    render() {
        var answersList = this.props.question.AnswersStat.map(function(element) {
            return(
                <Answer
                    key = {element.Text}
                    answer = {element}
                />
            )
        })
        return(
            <div className = "panel panel-default">
                <div className = "panel-header">
                    {this.props.question.Text}
                </div>
                <div className = "panel-body">
                    {answersList}
                </div>
            </div>

        )
    }
}