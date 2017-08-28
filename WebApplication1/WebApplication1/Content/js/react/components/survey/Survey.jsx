import React from 'React'
import { Button } from '../helpers/Button.jsx'
import ReactQuill from 'react-quill'
import { FileOption } from './options/FileOption.jsx'
import { DropDownOption } from './options/DropDownOption.jsx'
import { CheckFormOption } from './options/CheckFormOption.jsx'

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



export class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionId: this.props.question.Id,
            selectedValues: ""
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.setState({
            selectedValues: String(this.props.question.Options[0].Id)
        })
    }

    onChange(e) {
        this.setState({
            selectedValues: e
        })
        this.props.onChange(e, this.state.questionId)
    }

    render() {
        var self = this
        var Options
        if(this.props.question.QuestionType.Type == "options") {
            Options = this.props.question.Options.map(function(element, index) {
                return(
                    <CheckFormOption 
                        key = {index}
                        index = {index}
                        Text = {element.Text}
                        name = {self.props.question.Text}
                        aid = {element.Id}
                        qid = {self.props.question.Id}
                        onChange = {self.onChange}
                        isChecked = {self.state.selectedValues.split(";").includes(String(element.Id))}
                    />
                )
            }
        )} 

        if(this.props.question.QuestionType.Type == "dropdown") {
            Options = <DropDownOption 
                        options = {this.props.question.Options}
                        onChange = {this.onChange}
                    />
        }


        if(this.props.question.QuestionType.Type == "text") {
            Options = <ReactQuill 
                data-id={this.props.indexQ} 
                onChange={this.onChange}
                modules={Question.modules}
                formats={Question.formats} 
            />
        }

        if(this.props.question.QuestionType.Type == "file") {
            Options = <FileOption
                        onDone = {this.onChange}
                     />
        }

        return(
            <div className = "panel panel-default">
                <div className = "panel-body">
                    <fieldset className="form-group">
                        <legend dangerouslySetInnerHTML={{__html: this.props.question.Text}} />
                        {Options}
                    </fieldset>
                </div>
            </div>
        )
    }
}

Question.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

  
  Question.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]





