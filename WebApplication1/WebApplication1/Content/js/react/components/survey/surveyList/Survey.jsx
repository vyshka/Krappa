import React from 'React'

export class Survey extends React.Component {
    render() {
        return(
            <a 
                href={"/Home/Survey/" + this.props.item.Id} 
                key={this.props.item.SurveyName} 
                className="list-group-item"
            >
                {this.props.item.Name} вопросов: {this.props.item.Questions.length}
            </a>
        )
    }
}