import React from 'React'

export class CheckFormOption extends React.Component {
    render() {
        return(
        <div className="form-check">
            <label className="form-check-label">
                <input
                    checked = {this.props.isChecked}
                    data-aid = {this.props.aid}
                    data-qid = {this.props.qid}
                    type = "radio" 
                    className = "form-check-input" 
                    value = {this.props.Text}
                    onClick = {this.props.onChange}
                />
                {this.props.Text}
            </label>
        </div>
        )  
    }
}