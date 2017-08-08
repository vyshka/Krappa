import React from 'React'
import ReactDOM from 'React-DOM'


export class QuestionForm extends React.Component {
    render() {
        var questionList = this.props.list.map(function(element, index) {
                return(
                    <EditForm 
                        key = {index}
                        question = {element}
                    />
                )
            });
        return(
            <div>
                {questionList}
            </div>
        )
    }
}


class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: this.props.question.answers,
            question: this.props.question.text
        }

        this.addAnswer = this.addAnswer.bind(this);
        this.changeA = this.changeA.bind(this);
        this.changeQ = this.changeQ.bind(this);
    }

    changeQ(e) { 
        this.setState({
            question: e.target.value
        });
    };

    changeA(e) {
        console.log()
        var index = e.target.getAttribute('data-id');
        console.log(this.state.answers);
        console.log(this.state.answers[index]);
        var newData = this.state.answers;
        newData[index] = e.target.value;
        this.setState({
            answers: newData
        });
    };

    
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
                    <input data-id={index} key={index} className="form-control" value={self.state.answers[index]} onChange={self.changeA}/>
                )
            });

        return(
            <div className = "form-horizontal" >
                <Question 
                    qText = {this.state.question}    
                    onChange = {this.changeQ}
                />
                <label className="control-label">Ответы</label>
                <div className="form-group">
                    {Answers}
                </div>
                <BtnAddA
                    AddAction={e => this.addAnswer(e)}
                />
            </div>
        )
    }
}

class BtnAddA extends React.Component {
    render() {
        return(
            <button className="btn btn-default" onClick={this.props.AddAction} id = "btnAddA">Добавить ответ</button>
        )
    }
}

class Question extends React.Component {
    render() {
        return(
            <div className="form-group">
                <label className="control-label">Вопрос </label>
                <input onChange = {this.props.onChange} className = "form-control" value = {this.props.qText}/>
            </div>
        )
    }
}