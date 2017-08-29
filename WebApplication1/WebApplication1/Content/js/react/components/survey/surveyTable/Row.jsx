import React from 'React'
import { Links } from './Links.jsx'

export class Row extends React.Component {
    render() {
        var rowColumns = [];
        rowColumns.push(<td key = {this.props.row.Name} >{this.props.row.Name}</td>);
        rowColumns.push(<td key = {"ResultCount" + this.props.row.ResultCount} >{this.props.row.ResultCount}</td>);
        rowColumns.push(<td key = {"/Home/Survey/" + this.props.row.Id} >
                            <a href={"/Home/Survey/" + this.props.row.Id}> 
                                Ссылка
                            </a>
                        </td>);
        rowColumns.push(<td key = {this.props.row.UpdateTime} >{this.props.row.UpdateTime}</td>);
        rowColumns.push(
            <td key = {"/Admin/Stat/" + this.props.row.Id}>
                <a href= {"/Admin/Stat/" + this.props.row.Id}>
                    Результаты
                </a>
            </td>
        )
        
        return(
            <tr key = {this.props.row.Id}>
                {rowColumns}
                <Links 
                    deleteUrl = {this.props.deleteUrl}
                    delete = {this.props.delete}
                    editUrl = {this.props.editUrl}
                    id = {this.props.row.Id} />
            </tr>
        )
    }
}