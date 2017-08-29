import React from 'React'


export class DropDownOption extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedValue: this.props.options[0].Text
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        console.log
        this.setState({
            selectedValue: e.target.value
        })
        this.props.onChange(e.target.value)
    }

    render() {
        var self = this
        var Options = this.props.options.map(function(element, index) {
            return(
                <option 
                    value = {element.Text} 
                    key = {index}
                >
                    {element.Text}
                </option>
            )
        });
        return(
            <select 
                className = "form-control"
                onChange = {this.onChange}
                value = {this.state.selectedValue}
            >
                {Options}
            </select>
        )
    }
}