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
    }

    compliteSurvey(e) {
        
    }

    onChange(e) {
        var indexq = e.target.getAttribute('data-qid')
        var indexa = e.target.getAttribute('data-aid')
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
                        answerId: 0
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
                    key = {index}
                    question = {element}  
                    onChange = {self.onChange}  
                />
            )
        })
        return(
            <div>
                {questionsList}
            </div>

        )
    }
}



class Question extends React.Component {
    render() {
        var self = this
        var answerslist = this.props.question.Answers.split(',');
        var Answers = answerslist.map(function(element, index) {
            return(
                <FormCheck 
                    key = {index}
                    Text = {element}
                    name = {self.props.question.Text}
                    aid = {index}
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
                    onChange = {this.props.onChange}
                />
                {this.props.Text}
            </label>
        </div>
        )
        
    }
}