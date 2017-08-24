import React from 'React'
import { Question } from '../survey/Survey.jsx'

export class SurveyResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: {
                Answers: [],
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
        var resultList = this.state.model.Answers.map(function(element, index) {
            return(
                <div key={element.Id} className = "panel panel-defaul">
                    <div className = "panel-body">
                        <fieldset className = "form-group">
                        <legend 
                            dangerouslySetInnerHTML={{__html: element.Question.Text}} />
                            {element.AnswerText}
                        </fieldset>
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h3>Опрос {this.state.model.Survey.Name}, пройден {this.state.model.CompleteTime}</h3>
                {resultList}
            </div>
        )
    }
}