import React from 'React'
import { BarMetric } from 'salad-ui.chart'

export class Answer extends React.Component {
    render() {
        return(
            <div>
                <div 
                    dangerouslySetInnerHTML={{__html: this.props.answer.Text}}
                />
                <BarMetric
                    label=""
                    percent={this.props.answer.Percent}
                    value={this.props.answer.Count}
                    metricName={this.props.answer.Percent + '%'}
                />
            </div>
                    

        )
    }
}