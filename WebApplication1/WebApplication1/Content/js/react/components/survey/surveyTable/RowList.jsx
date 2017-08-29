import React from 'React'
import { Row } from './Row.jsx'

export class RowList extends React.Component {
    render() {
        var self = this 
        var rowNodes = this.props.data.map(function(element) {
            return (
                <Row 
                    editUrl = {self.props.editUrl} 
                    delete = {self.props.delete}
                    deleteUrl = {self.props.deleteUrl} 
                    key = {element.Id} 
                    row = {element} 
                />
            )
        })
        return (
            <tbody>
                {rowNodes}
            </tbody>
        )
    }
}