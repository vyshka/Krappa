import React from 'React'
import { Question } from '../survey/completeSurvey/Question.jsx'

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
            url: "/results/" + id,
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var self = this
        var resultList = this.state.model.Answers.map(function(element, index) {
            var answersList = []

            if(element.Question.QuestionType.Type == "options") {
                var AnswersIdArr = element.AnswerText.split(";")
                AnswersIdArr.forEach(function(arrElement) {
                    element.Question.Options.forEach(function(option) {
                        if(parseInt(arrElement) == option.Id) {
                            answersList.push(option.Text)
                        }
                    }, this);
                }, this);
            } 
            
            
            
            if(element.Question.QuestionType.Type == "text" || element.Question.QuestionType.Type == "dropdown") {
                answersList.push(element.AnswerText)
            }


            if(element.Question.QuestionType.Type == "file") {
                var filename = element.AnswerText.substr(element.AnswerText.lastIndexOf('\\') + 1)
                answersList.push(filename)
                var SurveyId = self.state.model.Id
                return(
                    <div key={element.Id} className = "panel panel-defaul">
                        <div className = "panel-body">
                            <fieldset>
                                <legend 
                                    dangerouslySetInnerHTML={{__html: element.Question.Text}} 
                                />
                                <a href = {"/downloadfile/" + SurveyId + "/" + filename + "/"} >
                                    {filename}
                                </a>
                            </fieldset>
                        </div>
                    </div>
                )
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