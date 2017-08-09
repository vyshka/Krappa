import React from 'React'
import ReactDOM from 'React-DOM'


export class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.list
        }

        this.addEditForm = this.addEditForm.bind(this);
        this.chekState = this.chekState.bind(this);
            
        this.changeA = this.changeA.bind(this);
        this.changeQ = this.changeQ.bind(this);
        this.deleteA = this.deleteA.bind(this);
        this.deleteQ = this.deleteQ.bind(this);

    }

    chekState() {
        console.log(this.state)
    }

    changeQ(e) { 
        var newData = this.state.questions;
        var index = e.target.parentNode.getAttribute("data-id")
        newData[index].question = e.target.value
        this.setState({
            questions: newData
        });
        
    };

    changeA(e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.questions;
        newData[indexQ].answers[indexA] = e.target.value;
        this.setState({
            questions: newData
        });
    };

    deleteA(e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.questions;
        newData[indexQ].answers.splice(indexA, 1);
        this.setState({
            questions: newData
        })
    }

    deleteQ(e) {
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.questions;
        newData.splice(indexQ, 1);
        this.setState({
            questions: newData
        })
    }

    addEditForm() {
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
        var questionList = this.state.questions.map(function(element, index) { //question
                return(
                    <EditForm 
                        key = {index}
                        question = {self.state.questions[index].question}
                        answers = {self.state.questions[index].answers}
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
                <BtnAddA
                    AddAction={e => this.addEditForm(e)}
                    text="вопрос"
                />

                <BtnAddA 
                    AddAction={e => this.chekState(e)}
                    text="temp"
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

    addAnswer() { 
        var newData = this.state.answers;
        newData.push("");
        this.setState({
            answers: newData
        })
    }

    render() {
        let self = this;
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
                <BtnAddA
                    AddAction={e => this.addAnswer(e)}
                    text="ответ"
                />
            </div>
        )
    }
}

class BtnAddA extends React.Component {
    render() {
        return(
            <button className="btn btn-default" onClick={this.props.AddAction} id = "btnAddA">Добавить {this.props.text}</button>
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