import React from 'React'

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
        var ResultModel = {
            surveyId: this.state.Survey.Id,
            AnswersQuestions: this.state.results
        }
        console.log(ResultModel)
        $.ajax({
            url: "/api/Result/SaveResult",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(ResultModel),
            success: function() {
                console.log("Complete")
            }
        })
    }

    onChange(e) {
        var indexq = parseInt(e.target.getAttribute('data-qid'))
        var indexa = parseInt(e.target.getAttribute('data-aid'))
        var newResults = this.state.results
        newResults.some(function(element) {
            if(element.questionId == indexq) {
                element.answerId = indexa
                return true
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
                var results = data.Questions.map(function(element) {
                    return {
                        
                        questionId: element.Id,
                        answerId: undefined
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
                {questionsList}
                <Btn 
                    Action = {this.compliteSurvey}
                    text = "Завершить"
                />
            </div>

        )
    }
}



class Question extends React.Component {
    render() {
        var self = this
        var Answers = this.props.question.Answers.map(function(element, index) {
            return(
                <FormCheck 
                    key = {index}
                    Text = {element.Text}
                    name = {self.props.question.Text}
                    aid = {element.Id}
                    qid = {self.props.question.Id}
                    onChange = {self.props.onChange}
                />
            )
        });

        return(
            <fieldset className="form-group">
                <legend>{this.props.question.Text}</legend>
                {Answers}
            </fieldset>
        )
    }
}

class FormCheck extends React.Component {
    render() {
        return(
        <div className="form-check">
            <label className="form-check-label">
                <input
                    data-aid = {this.props.aid}
                    data-qid = {this.props.qid}
                    type = "radio" 
                    className = "form-check-input" 
                    name = {this.props.name}
                    onClick = {this.props.onChange}
                />
                {this.props.Text}
            </label>
        </div>
        )
        
    }
}

class Btn extends React.Component {
    render() {
        return(
            <button data-index={this.props.index} className="btn btn-default" onClick={this.props.Action} >{this.props.text}</button>
        )
    }
}