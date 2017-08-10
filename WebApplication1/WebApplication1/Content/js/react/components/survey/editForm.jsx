import React from 'React'
import ReactDOM from 'React-DOM'


export class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Survey: {
                Questions: [],
                name: ""
            }
        }

        this.addEditForm = this.addEditForm.bind(this);
        this.chekState = this.chekState.bind(this);
            
        this.changeA = this.changeA.bind(this);
        this.changeQ = this.changeQ.bind(this);
        this.deleteA = this.deleteA.bind(this);
        this.deleteQ = this.deleteQ.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "/api/Survey/GetSurveyById/1",
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    Survey: data
                })
            }.bind(this)
        })
    }

    updateSurvey () {
        $.ajax({
            url: "api/Survey/UpdateSurvey",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(this.state),
            success: function(data) {
                console.log(data);
            }

        })
    }


    chekState () {
        console.log(this.state)
    }

    changeQ (e){ 
        var newData = this.state.Survey;
        var index = e.target.parentNode.getAttribute("data-id");
        newData.Question[index].question = e.target.value
        this.setState({
            Survey: newData
        });
        
    };

    changeA (e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.Survey;
        newData.Question[index].answers[indexA] = e.target.value;
        this.setState({
            Survey: newData
        });
    };

    deleteA (e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.questions;
        newData[indexQ].answers.splice(indexA, 1);
        this.setState({
            questions: newData
        })
    }

    deleteQ (e) {
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.questions;
        newData.splice(indexQ, 1);
        this.setState({
            questions: newData
        })
    }

    

    addEditForm () {
        var newData = this.state.questions;
        var question = {
            question: "Вопрос",
            answers: ["Ответ 1", "Ответ 2"]
        }
        newData.push(question);
        this.setState({
            questions: newData
        })
        
    }
    render() {
        var self = this;
        // console.log(this.state.Survey.Questions);
        // this.state.Survey.Questions.map(function(element, index) {
        //     console.log(element);
        // })
        // return(
        //     <div />
        // )
        
        var questionList = this.state.Survey.Questions.map(function(element, index) { //question
                return(
                    <EditForm 
                        key = {index}
                        question = {self.state.Survey.Questions[index].Text}
                        answers = {self.state.Survey.Questions[index].Answers}
                        index = {index}
                        changeA = {self.changeA}
                        changeQ = {self.changeQ}
                        deleteA = {self.deleteA}
                        deleteQ = {self.deleteQ}
                    />
                )
            });
        return(
            <div>
                {questionList}
                <Btn
                    Action={e => this.addEditForm(e)}
                    text="Добавить вопрос"
                />

                <Btn 
                    Action={e => this.chekState(e)}
                    text="temp"
                />
                <Btn
                    Action={e => this.updateSurvey(e)}
                    text="Сохранить"
                 />
            </div>
        )
    }
}



class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: this.props.answers,
            question: this.props.question
        }

        this.addAnswer = this.addAnswer.bind(this);
    }

    addAnswer () { 
        var newData = this.state.answers;
        newData.push("");
        this.setState({
            answers: newData
        })
    }

    render() {
        let self = this;
        console.log(this.props)
        var Answers = this.state.answers.map(function(element, index) {
                return(
                    <div className = "input-del" key={index}>
                        <input 
                            placeholder="Ответ" 
                            className="form-control" 
                            value={self.state.answers[index]} 
                            onChange={self.props.changeA}
                            data-qid = {self.props.index} 
                            data-id={index} 
                            key={index}
                        />
                        <a>
                            <span 
                                data-qid = {self.props.index} 
                                key={index}                       
                                onClick = {self.props.deleteA}      
                                className = 'glyphicon glyphicon-trash' 
                            />
                        </a>
                    </div>
                )
            });

        return(
            <div className = "edit-form">
                <div className="input-del">
                    <Question 
                        question = {this.props.question}    
                        index = {this.props.index}
                        onChange = {this.props.changeQ}
                    />
                    <a>
                        <span 
                            data-qid = {self.props.index} 
                            key = {self.props.index}
                            onClick = {self.props.deleteQ}      
                            className = 'glyphicon glyphicon-trash' 
                        />
                    </a>
                </div>
                <label className="control-label">Ответы</label>
                <div className="form-group">
                    {Answers}
                </div>
                <Btn
                    AddAction={e => this.addAnswer(e)}
                    text="Добавить ответ"
                />
            </div>
        )
    }
}

class Btn extends React.Component {
    render() {
        return(
            <button className="btn btn-default" onClick={this.props.Action} >{this.props.text}</button>
        )
    }
}

class Question extends React.Component {
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.index + 1} вопрос</label>
                <input data-id={this.props.index} onChange = {this.props.onChange} className = "form-control" value = {this.props.question}/> 
                {/* deldetespan */}
            </div>
        )
    }
}