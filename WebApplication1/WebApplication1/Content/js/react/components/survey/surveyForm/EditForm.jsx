import React from 'React'
import { Options } from './Options.jsx'
import { OptionSelect } from './OptionSelect.jsx'
import { Question } from './Question.jsx'


export class EditForm extends React.Component {
    render() {
        let self = this;
        return(
            <div className = "panel panel-default edit-form">
                <div className="input-del">
                    <Question 
                        Text = {this.props.question.Text}    
                        indexQ = {this.props.question.Id}
                        index = {this.props.index}
                        onChange = {this.props.onChange}
                        deleteQ = {this.props.deleteQ}
                    />
                </div>
                <label className="control-label right-margin">Ответы </label>
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