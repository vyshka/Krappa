import React from 'React'



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
            
        this.changeA = this.changeA.bind(this);
        this.changeQ = this.changeQ.bind(this);
        this.changeN = this.changeN.bind(this);
        this.deleteA = this.deleteA.bind(this);
        this.deleteQ = this.deleteQ.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.arrToString = this.arrToString.bind(this);
        this.stringToArr = this.stringToArr.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
    }

    addAnswer (e) { 
        var id = e.target.getAttribute('data-index')
        var newData = this.state.model;
        newData.Questions.forEach(function(element, indexQ) {
            if(element.Id == id) {
                $.ajax({
                    url: "/api/Answer/CreateAnswer/" + id,
                    dataType: 'JSON',
                    success: function(data) {
                        newData.Questions[indexQ].Answers.push({
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

    componentDidMount() {

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

            }
        })
    }

    deleteSurvey () {
        $.ajax({
            url: "/api/Survey/DeleteSurvey/" + parseInt(this.state.model.Id),
            method: 'POST',
        })
    }

    changeQ (e){ 
        var newData = this.state.model;
        var index = e.target.getAttribute("data-id");
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == index) {
                element.Text = e.target.value
            }
            
        }, this);
        this.setState({
            model: newData
        });
    };

    changeA (e) {
        var indexA = e.target.getAttribute('data-id');
        var indexQ = e.target.getAttribute('data-qid');
        var newData = this.state.model;
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == indexQ) {
                element.Answers.forEach(function(answer, asnwerIndex) {
                    if(answer.Id == indexA) {
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
        newData.name = e.target.value;        
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
        newData.Questions.forEach(function(element, questionIndex) {
            if(element.Id == indexQ) {
                element.Answers.forEach(function(answer, asnwerIndex) {
                    if(answer.Id == indexA) {
                        element.Answers.splice(asnwerIndex, 1)
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

    



    render() {
        var self = this;
        var questionList = this.state.model.Questions.map(function(element, index) { //question
                return(
                    <EditForm 
                        key = {index}
                        question = {self.state.model.Questions[index]}
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
                <div className="form-group">
                    <label className="control-label">Название опроса</label>
                    <input
                        placeholder="Название опроса" 
                        className="form-control" 
                        value={this.state.model.name} 
                        onChange={this.changeN}
                    />     
                </div>
                           
                {questionList}
                <Btn
                    Action={e => this.addEditForm(e)}
                    text="Добавить вопрос"
                />
                <a href="/Admin/SurveyList">
                    <Btn
                        Action={e => this.updateSurvey(e)}
                        text="Сохранить"
                    />
                </a>

                <a href="/Admin/SurveyList">
                    <Btn
                        Action={e => this.deleteSurvey()}
                        text="Удалить"
                    />
                 </a>

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
        var Answers = this.props.answers.map(function(element, index) {
                return(
                    <div className = "input-del" key={index}>
                        <input 
                            placeholder="Ответ" 
                            className="form-control" 
                            value={element.Text} 
                            onChange={self.props.changeA}
                            data-qid = {self.props.question.Id} 
                            data-id={element.Id} 
                            key={index}
                        />
                        <a>
                            <span 
                                data-id={element.Id} 
                                data-qid = {self.props.question.Id} 
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
                        question = {this.props.question.Text}    
                        indexQ = {this.props.question.Id}
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
                    index = {this.props.question.Id}
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
                <input data-id={this.props.indexQ} onChange = {this.props.onChange} className = "form-control" value = {this.props.question}/> 
            </div>
        )
    }
}
