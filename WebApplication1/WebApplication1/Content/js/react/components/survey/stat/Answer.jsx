import React from 'React'
import SaladUI from 'salad-ui'

export class Answer extends React.Component {
    render() {
        return(
            <div>
                <div 
                    dangerouslySetInnerHTML={{__html: this.props.answer.Text}}
                />
                <SaladUI.Chart.BarMetric
                    label=""
                    percent={this.props.answer.Percent}
                    value={this.props.answer.Count}
                    metricName="ответов"
                />
            </div>
                    

        )
    }
}