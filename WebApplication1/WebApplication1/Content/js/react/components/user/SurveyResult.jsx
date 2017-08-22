import React from 'React'
import { Question } from '../survey/Survey.jsx'

export class SurveyResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: {
                AnswerQuestionResult: [],
                Survey: {
                    name: ""
                }
            }
        }
    }

    componentWillMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();

        $.ajax({
            url: "/api/Result/GetResultById/" + id,
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var resultList = this.state.model.AnswerQuestionResult.map(function(element, index) {
            return(
                <div key={element.Id} className = "panel panel-defaul">
                    <div className = "panel-body">
                        <fieldset className = "form-group">
                            <legend>{element.Question.Text}</legend>
                            {element.Answer.Text}
                        </fieldset>
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h3>Опрос {this.state.model.Survey.name}, пройден {this.state.model.CompliteTime}</h3>
                {resultList}
            </div>
        )
    }
}