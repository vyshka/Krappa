import React from 'React'
import { DeleteLink } from './helpers/DeleteLink.jsx'
import { EditLink } from './helpers/EditLink.jsx'

export class Links extends React.Component{    
    render() {
        return(
            <td>
                <DeleteLink 
                    deleteUrl = {this.props.deleteUrl} 
                    delete = {this.props.delete} 
                    id = {this.props.id}
                />
                <EditLink 
                    editUrl = {this.props.editUrl} 
                    id = {this.props.id}
                />
            </td>
        )
    }
}