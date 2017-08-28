import React from 'React'

export class CheckFormOption extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedValues: ""
        }
    }

    onClick(e) {
        var optionId = e.target.getAttribute("data-aid")
        var newSelectedValues = this.state.selectedValues
        if(!this.state.selectedValues.split(";").includes(optionId)) {
            newSelectedValues += ";" + optionId
        } else {
            var selectedArr = newSelectedValues.split(";")
            var index = selectedArr.indexOf(optionId)
            selectedArr.splice(index, 1)
            newSelectedValues = selectedArr.join(";")
        }

        this.setState({
            selectedValues: newSelectedValues
        })
        this.props.onChange(newSelectedValues)
    }



    render() {
        return(
        <div className="form-check">
            <label className="form-check-label">
                <input
                    defaultChecked
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