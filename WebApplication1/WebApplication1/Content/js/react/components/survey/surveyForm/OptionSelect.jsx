import React from 'React'

export class OptionSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: this.props.questionType
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({
            selectedValue: e.target.value
        })
        this.props.changeQuestionType(e.target.value, this.props.indexQ)
    }

    render() {
        return(
            <select value={this.state.selectedValue} onChange={this.onChange}>
                <option value="options">Ответы</option>
                <option value="text">Текст</option>
                <option value="file">Файл</option>
                <option value="dropdown">Выпадающий список</option>
            </select>
        )
    }
}