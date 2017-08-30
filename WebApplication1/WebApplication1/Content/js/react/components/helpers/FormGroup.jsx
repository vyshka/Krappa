import React from 'React'

export class FormGroup extends React.Component {
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.text}</label>
                <input type={this.props.type} className="form-control" id={this.props.id} value={this.props.value} onChange = {this.props.onChange} />
                <ErrorText text={this.props.error} />
            </div>
            
        )
    }
}

class ErrorText extends React.Component{
    render() {
        return(
            <span className="text-danger field-validation-error">{this.props.text}</span>
        )
    }
}

