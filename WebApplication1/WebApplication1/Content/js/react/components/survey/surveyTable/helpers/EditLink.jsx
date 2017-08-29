import React from 'React'


export class EditLink extends React.Component{
    render() {
        return(
            <a href={this.props.editUrl + this.props.id}>
                <span className="glyphicon glyphicon-edit"></span>
            </a>
        )
    }
}