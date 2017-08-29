import React from 'React'
import { Answer } from './Answer.jsx'

export class Question extends React.Component {
    render() {
        var answersList = this.props.question.AnswersStat.map(function(element) {
            return(
                <Answer
                    key = {element.Text}
                    answer = {element}
                />
            )
        })
        return(
            <div className = "panel panel-default">
                <div 
                    className = "panel-header"
                    dangerouslySetInnerHTML={{__html: this.props.question.Text}}
                />
                <div className = "panel-body">
                    {answersList}
                </div>
            </div>

        )
    }
}