import React from 'React'
import { Button } from '../../helpers/Button.jsx'
import { Question } from './Question.jsx'


export class Survey extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            Survey: {
                Questions: [],
                name: ""
            },
            results: []
        }

        this.onChange = this.onChange.bind(this)
        this.compliteSurvey = this.compliteSurvey.bind(this)
    }

    compliteSurvey() {
        var results = this.state.results
        results.forEach(function(element) {
            var text = element.Text
            var textArr = text.split(";")
            textArr.sort()
            var index = textArr.indexOf("")
            if(index != -1) {
                textArr.splice(index, 1)
            }
            element.Text = textArr.join(";")
        }, this);


        var ResultModel = {
            surveyId: this.state.Survey.Id,
            AnswersQuestions: results
        }

        $.ajax({
            url: "/api/Result/SaveResult",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(ResultModel),
            success: function() {
                window.location.pathname = '/Home/CompliteSurvey'
            }
        })
    }

    onChange(selectedValues, questionId) {
        var newResults = this.state.results
        newResults.some(function(element) {
            if(element.questionId == questionId) {
                element.Text = selectedValues
            }
        })

        this.setState({
            results: newResults
        })
    }

    componentDidMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();
        $.ajax({
            url: "/api/Survey/GetSurveyById/" + id,
            dataType: 'JSON',
            success: function(data) {
                var results = data.Questions.map(function(element, index) {
                    return {
                        questionId: element.Id,
                        Text: String(element.Options[0].Id)
                    }
                })
                this.setState({
                    Survey: data,
                    results: results
                })
            }.bind(this)
        })
        

    }

    render() {
        var self = this
        var questionsList = this.state.Survey.Questions.map(function(element, index) {
            return(
                <Question 
                    key = {element.Id}
                    question = {element}  
                    onChange = {self.onChange}  
                />
            )
        })
        return(
            <div>
                <h3>{this.state.Survey.Name}</h3>
                {questionsList}
                <Button 
                    Action = {this.compliteSurvey}
                    text = "Завершить"
                />
            </div>

        )
    }
}









