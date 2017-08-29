import React from 'React'

import { Question } from './Question.jsx'

export class Stat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                QuestionStat: [],
                Name: ""
            }
        }
    }

    componentDidMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();
        
        $.ajax({
            url: "/survey/" + id + "/stat",
            method: 'GET',
            dataType: 'JSON',
            success: function(data) {
                this.setState({
                    model: data
                })
            }.bind(this)
        })
    }

    render() {
        var questionList = this.state.model.QuestionStat.map(function(element) {
            return(
                <Question 
                    key = {element.Text}
                    question = {element}
                />
            )
        })
        return(
            <div>
                <h3>
                    {this.state.model.Name}
                </h3>
                {questionList}
            </div>
        )
    }
}



