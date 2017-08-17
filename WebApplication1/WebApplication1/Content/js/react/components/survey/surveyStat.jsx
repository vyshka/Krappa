import React from 'React'


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
                {this.props.answer.Text}: {this.props.answer.Count}
            </div>
        )
    }
}

class Question extends React.Component {
    render() {
        var answersList = this.props.question.AnswersStat.map(function(element) {
            return(
                <Answer
                    answer = {element}
                />
            )
        })
        return(
            <div>
                <lable>
                    {this.props.question.Text}
                </lable>
                {answersList}
            </div>

        )
    }
}