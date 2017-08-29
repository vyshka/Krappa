import React from 'React'
import { CheckFormOption } from './CheckFormOption.jsx'

export class CheckForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedValues: String(this.props.question.Options[0].Id)
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
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
        var self = this
        var options = this.props.question.Options.map(function(element, index) {
                return(
                    <CheckFormOption 
                        key = {index}
                        index = {index}
                        Text = {element.Text}
                        name = {self.props.question.Text}
                        aid = {element.Id}
                        qid = {self.props.question.Id}
                        onChange = {self.onChange}
                        isChecked = {self.state.selectedValues.split(";").includes(String(element.Id))}
                    />
                )
            })
            return(
                <div>
                    {options}
                </div>
            )
    }
}