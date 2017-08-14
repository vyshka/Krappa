import React from 'React'
import ReactDOM from 'React-DOM'



export class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
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
        this.addAnswer = this.addAnswer.bind(this);
        this.arrToString = this.arrToString.bind(this);
        this.stringToArr = this.stringToArr.bind(this);
    }

    addAnswer (e) { 
        var index = e.target.getAttribute('data-index')
        var newData = this.state.model;
        newData.Questions[index].Answers += ","; //edit 
        this.setState({
            model: newData
        })
    }

    componentDidMount() {
        $.ajax({
            url: "/api/Survey/GetSurveyById/2",
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
            success: function(data) {
                console.log("success")
            }

        })
    }

    chekState () {
        console.log(this.state)
    }

    changeQ (e){ 
        var newData = this.state.model;
        var index = e.target.getAttribute("data-id");
        console.log(index);
        console.log(newData);
        newData.Questions[index].Text = e.target.value
        this.setState({
            model: newData
        });
        
    };

    changeA (e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        var newAnswers = this.stringToArr(newData.Questions[indexQ].Answers);
        newAnswers[indexA] = e.target.value;
        newData.Questions[indexQ].Answers = this.arrToString(newAnswers);
        
        this.setState({
            model: newData
        });
    };

    arrToString(arr) {
        return arr.join(',')
    }
    stringToArr(string) {
        return string.split(',')
    }

    deleteA (e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        var newAnswers = this.stringToArr(newData.Questions[indexQ].Answers);
        newAnswers.splice(indexA, 1);
        newData.Questions[indexQ].Answers = this.arrToString(newAnswers);
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

    addEditForm () {
        var newData = this.state.model;
        var question = {
            Text: "Вопрос",
            Answers: "Ответ 1,Ответ 2"
        }
        newData.Questions.push(question);
        this.setState({
            model: newData
        })
        
    }



    render() {
        var self = this;
        var questionList = this.state.model.Questions.map(function(element, index) { //question
                return(
                    <EditForm 
                        key = {index}
                        question = {self.state.model.Questions[index].Text}
                        answers = {self.state.model.Questions[index].Answers}
                        index = {index}
                        changeA = {self.changeA}
                        changeQ = {self.changeQ}
                        deleteA = {self.deleteA}
                        deleteQ = {self.deleteQ}
                        addA = {self.addAnswer}
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
    }

    

    render() {
        let self = this;
        console.log(this.props);
        var answerslist = this.props.answers.split(',');
        
        var Answers = answerslist.map(function(element, index) {
                return(
                    <div className = "input-del" key={index}>
                        <input 
                            placeholder="Ответ" 
                            className="form-control" 
                            value={element} 
                            onChange={self.props.changeA}
                            data-qid = {self.props.index} 
                            data-id={index} 
                            key={index}
                        />
                        <a>
                            <span 
                                data-id={index} 
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
                    Action={e => this.props.addA(e)}
                    index = {this.props.index}
                    text="Добавить ответ"
                />
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

class Question extends React.Component {
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.index + 1} вопрос</label>
                <input data-id={this.props.index} onChange = {this.props.onChange} className = "form-control" value = {this.props.question}/> 
            </div>
        )
    }
}
