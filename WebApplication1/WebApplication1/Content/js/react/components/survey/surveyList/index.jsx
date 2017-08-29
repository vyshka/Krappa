import React from 'React'
import { Survey } from './Survey.jsx'

export class SurveyList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            model: []
        }
    }
    componentWillMount() {
        var parts = window.location.href.split('/');
        var id = parts.pop() || parts.pop();

        $.ajax({
            url: "/surveys",
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
        var resultslist = this.state.model.map(function(data, index) {
            return(
                <Survey
                    key = {index}
                    item = {data}
                />
            )
        })
        return(
            <div>
                <div className="list-group">
                    {resultslist}
                </div> 
            </div>
        )
    }
}

