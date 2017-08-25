import React from 'React'
import {Button } from '../../helpers/Button.jsx'

export class DefOption extends React.Component {
    render() {
        var self = this
        var Options = this.props.options.map(function(element, index) {
            return(
                <div className = "input-del" key={index}>
                    <input 
                        placeholder = "Ответ" 
                        className = "form-control" 
                        value = {element.Text} 
                        onChange = {self.props.changeO}
                        data-qid = {self.props.questionId} 
                        data-id = {element.Id} 
                        key = {index}
                    />
                    <a>
                        <span 
                            data-id = {element.Id} 
                            data-qid = {self.props.questionId} 
                            key = {index}                       
                            onClick = {self.props.deleteA}      
                            className = 'glyphicon glyphicon-trash' 
                        />
                    </a>
                </div>
            )
        });
        return(
            <div>
                <div className="form-group">
                    {Options}
                </div>
                <Button
                    Action={this.props.addA}
                    index = {this.props.questionId}
                    text="Добавить ответ"
                />
            </div>
        )
    }
}