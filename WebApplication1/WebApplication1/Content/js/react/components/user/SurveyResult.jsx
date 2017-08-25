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
            var answersList = []

            if(element.Question.QuestionType == "options") {
                var AnswersIdArr = element.AnswerText.split(";")
                AnswersIdArr.forEach(function(arrElement) {
                    element.Question.Options.forEach(function(option) {
                        if(parseInt(arrElement) == option.Id) {
                            answersList.push(option.Text)
                        }
                    }, this);
                }, this);
            } else {  
                answersList.push(element.AnswerText)
            }
            var textResult = answersList.join()
            return(
                <div key={element.Id} className = "panel panel-defaul">
                    <div className = "panel-body">
                        <fieldset className = "form-group">
                        <legend 
                            dangerouslySetInnerHTML={{__html: element.Question.Text}} />
                            {textResult}
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