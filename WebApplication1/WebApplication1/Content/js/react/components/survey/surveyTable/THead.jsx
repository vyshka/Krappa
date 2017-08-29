import React from 'React'

export class THead extends React.Component {
    render() {
        var thList = this.props.th.map(function(element) {
            return(
                <th key = {element}>
                    {element}
                </th>
            )
        })
        return(
            <thead>
                <tr >
                    {thList}
                </tr>
            </thead>
        )
    }
}