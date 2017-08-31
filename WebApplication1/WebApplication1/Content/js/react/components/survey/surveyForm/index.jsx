import React from 'React'
import { Button } from '../../helpers/Button.jsx'
import { EditForm } from './EditForm.jsx'
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
  } from 'react-sortable-hoc';






export class SurveyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                Questions: [],
                Name: ""
            }
        }

        this.addEditForm = this.addEditForm.bind(this);           
        this.changeO = this.changeO.bind(this);
        this.changeN = this.changeN.bind(this);
        this.deleteA = this.deleteA.bind(this);
        this.onChange = this.onChange.bind(this)
        this.deleteQ = this.deleteQ.bind(this);
        this.updateSurvey = this.updateSurvey.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
        this.changeQuestionType = this.changeQuestionType.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
    }

    addAnswer (e) { 
        var id = e.target.getAttribute('data-index')
        var newData = this.state.model;
        newData.Questions.forEach(function(element, indexQ) {
            if(element.Id == id) {
                $.ajax({
                    url: "/question/" + id + "/option",
                    method: 'POST',
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
            url: "/surveys/" + id + "/question",
            method: 'POST',
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
            url: "/surveys/" + id,
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
            url: "/surveys",
            contentType: "application/json",
            method: "PUT",
            data: JSON.stringify(this.state.model),
            success: function() {
                window.location.pathname = '/Admin/SurveyList'
            }
        })
    }

    deleteSurvey () {
        $.ajax({
            url: "/surveys/" + parseInt(this.state.model.Id),
            method: 'DELETE',
            success: function() {
                window.location.pathname = '/Admin/SurveyList'
            }
        })
    }

    onChange (e, index){ 
        var newData = this.state.model;
        newData.Questions.some(function(element) {
            if(element.Id == index) {
                element.Text = e
            }
            
        })
        this.setState({
            model: newData
        }, function() {
            console.log("index component")
        })

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
    
    onSortEnd = ({oldIndex, newIndex}) => {
        
        var newState = this.state
        let items = newState.model.Questions;
        newState.model.Questions = arrayMove(items, oldIndex, newIndex)
        
        newState.model.Questions.map(function(element, index) {
            element.Order = index
        })

        this.setState({
          model: newState.model,
        });
      }

      

    render() {
        var self = this;
        var items = this.state.model.Questions

        var questionList = this.state.model.Questions.map(function(element, index) {
            return(
                    <EditForm 
                        key = {index}
                        question = {element}
                        index = {index}
                        changeO = {self.changeO}
                        onChange = {self.onChange}
                        deleteA = {self.deleteA}
                        deleteQ = {self.deleteQ}
                        changeQuestionType = {self.changeQuestionType}
                        addA = {self.addAnswer}
                    />
            )
        });
        
        const SortableItem = SortableElement(({value}) => {
            return (
                <div className = "panel panel-default">
                    {value}
                </div>
            );
          });


        const SortableList = SortableContainer(({items}) => {
            return (
              <div>
                {items.map((value, index) => (
                  <SortableItem key={`item-${index}`} index={index} value={value} />
                ))}
              </div>
            )
          })

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

                <div>                           
                    {/* <SortableList 
                        items={questionList} 
                        onSortEnd={this.onSortEnd} 
                        lockAxis="y" 
                        pressDelay={200}
                    /> */}
                    {questionList}
                </div>


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






