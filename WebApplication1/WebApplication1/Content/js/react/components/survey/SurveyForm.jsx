import React from 'React'
import { Button } from '../helpers/Button.jsx'
import ReactQuill from 'react-quill'
import { DefOption } from './options/DefOption.jsx'
import { FileOption } from './options/FileOption.jsx'




export class SurveyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                Questions: [],
                name: ""
            }
        }

        this.addEditForm = this.addEditForm.bind(this);           
        this.changeO = this.changeO.bind(this);
        this.changeQ = this.changeQ.bind(this);
        this.changeN = this.changeN.bind(this);
        this.deleteA = this.deleteA.bind(this);
        this.deleteQ = this.deleteQ.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
        this.changeQuestionType = this.changeQuestionType.bind(this)
    }

    addAnswer (e) { 
        var id = e.target.getAttribute('data-index')
        var newData = this.state.model;
        newData.Questions.forEach(function(element, indexQ) {
            if(element.Id == id) {
                $.ajax({
                    url: "/api/Option/CreateOption/" + id,
                    dataType: 'JSON',
                    success: function(data) {
                        newData.Questions[indexQ].Options.push({
                            Id: data.Id,
                            Text: data.Text
                        })
                        this.setState({
                            model: newData
                        })
                    }.bind(this)
                })
            }
        }, this);
    }

    addEditForm () {
        var newData = this.state.model;
        var id = this.state.model.Id

        $.ajax({
            url: "/api/Question/CreateQuestion/" + id,
            dataType: 'JSON',
            success: function(data) {
                newData.Questions.push(data)
                this.setState({
                    model: newData
                })
            }.bind(this)
        })        
    }

    componentWillMount() {

        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();
        $.ajax({
            url: "/api/Survey/GetSurveyById/" + id,
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    updateSurvey () {
        $.ajax({
            url: "/api/Survey/UpdateSurvey",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(this.state.model),
            success: function() {
                window.location.pathname = '/Admin/SurveyList'
            }
        })
    }

    deleteSurvey () {
        $.ajax({
            url: "/api/Survey/DeleteSurvey/" + parseInt(this.state.model.Id),
            method: 'POST',
            success: function() {
                window.location.pathname = '/Admin/SurveyList'
            }
        })
    }

    changeQ (e, index){ 
        var newData = this.state.model;
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == index) {
                element.Text = e
            }
            
        }, this);
        this.setState({
            model: newData
        });
    };

    changeO (e) {
        var indexO = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == indexQ) {
                element.Options.forEach(function(answer, asnwerIndex) {
                    if(answer.Id == indexO) {
                        answer.Text = e.target.value;
                    }
                }, this);
            }
            
        }, this);
        this.setState({
            model: newData
        });
    };

    changeN (e) {

        var newData = this.state.model;
        newData.Name = e.target.value;        
        this.setState({
            model: newData
        });
    };


    deleteA (e) {
        var indexO = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == indexQ) {
                element.Options.forEach(function(answer, asnwerIndex) {
                    if(answer.Id == indexO) {
                        element.Options.splice(asnwerIndex, 1)
                    }
                }, this);
            }
            
        }, this);


        this.setState({
            model: newData
        })
    }

    deleteQ (e) {
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        newData.Questions.splice(indexQ, 1);
        this.setState({
            model: newData
        })
    }

    changeQuestionType(type, indexQ) {
        var newState = this.state.model
        var newQuestionsState = newState.Questions
        newState.Questions.some(function(element) {
            if(element.Id == indexQ) {
                element.QuestionType.Type = type;
                return true
            }
        })
        this.setState({
            model: newState
        })
    }
    
    render() {
        var self = this;

        var questionList = this.state.model.Questions.map(function(element, index) {
                return(
                    <EditForm 
                        key = {index}
                        question = {element}
                        index = {index}
                        changeO = {self.changeO}
                        changeQ = {self.changeQ}
                        deleteA = {self.deleteA}
                        deleteQ = {self.deleteQ}
                        changeQuestionType = {self.changeQuestionType}
                        addA = {self.addAnswer}
                    />
                )
            });
         
        return(
            <div>
                <div className="form-group">
                    <label className="control-label">Название опроса</label>

                    <input
                        placeholder="Название опроса" 
                        className="form-control" 
                        value={this.state.model.Name} 
                        onChange={this.changeN}
                    />    
                    
                    
                </div>
                           
                {questionList}
                <Button
                    Action={e => this.addEditForm(e)}
                    text="Добавить вопрос"
                />
                    <Button
                        Action={e => this.updateSurvey(e)}
                        text="Сохранить"
                    />

                    <Button
                        Action={e => this.deleteSurvey()}
                        text="Удалить"
                    />

            </div>
        )
    }
}



class Options extends React.Component {
    render() {
        if(this.props.qType == "options") {
            return(
                <DefOption {...this.props} />
            )    
        } 
        
        if(this.props.qType == "text") {
            return(
                <input 
                    placeholder = "Текст ответа" 
                    className = "form-control" 
                />
            )
        }

        if(this.props.qType == "file") {
            return(
                <FileOption />
            )
        }        

        if(this.props.qType == "dropdown") {
            return(
                <DefOption {...this.props}/>
            )
        }        
    }
}

class EditForm extends React.Component {
    render() {
        let self = this;
        return(
            <div className = "edit-form">
                <div className="input-del">
                    <Question 
                        question = {this.props.question.Text}    
                        indexQ = {this.props.question.Id}
                        index = {this.props.index}
                        onChange = {this.props.changeQ}
                        deleteQ = {this.props.deleteQ}
                    />
                </div>
                <label className="control-label">Ответы</label>
                <OptionSelect 
                    changeQuestionType = {this.props.changeQuestionType}
                    indexQ = {this.props.question.Id}
                    questionType = {this.props.question.QuestionType.Type}
                />
                <Options 
                    qType = {this.props.question.QuestionType.Type}
                    options = {this.props.question.Options}    
                    onChange = {this.props.changeO}
                    questionId = {this.props.question.Id}
                    changeO = {this.props.changeO}
                    deleteA = {this.props.deleteA}
                    addA = {this.props.addA}
                />
            </div>
        )
    }
}

class OptionSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: this.props.questionType
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({
            selectedValue: e.target.value
        })
        this.props.changeQuestionType(e.target.value, this.props.indexQ)
    }

    render() {
        return(
            <select className="selectpicker" value={this.state.selectedValue} onChange={this.onChange}>
                <option value="options">Ответы</option>
                <option value="text">Текст</option>
                <option value="file">Файл</option>
                <option value="dropdown">Выпадающий список</option>
            </select>
        )
    }
}


class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Text: props.question,
            indexQ: props.indexQ
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.props.onChange(e, this.state.indexQ)
    }
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.index + 1} вопрос</label>
                <a>
                    <span 
                        data-qid = {this.props.index} 
                        key = {this.props.index}
                        onClick = {this.props.deleteQ}      
                        className = 'glyphicon glyphicon-trash' 
                    />
                </a>
                <ReactQuill 
                    data-id={this.props.indexQ} 
                    value={this.props.question}
                    onChange={this.onChange}
                    modules={Question.modules}
                    formats={Question.formats} 
                />
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
