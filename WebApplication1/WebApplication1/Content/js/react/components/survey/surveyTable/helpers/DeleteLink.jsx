import React from 'React'


export class DeleteLink extends React.Component{
    constructor(props) {
        super(props)      
        this.handleClick = this.handleClick.bind(this); 
    }

    render() {
        return(
            <a onClick={this.handleClick} >
                <span className = 'glyphicon glyphicon-trash' />
            </a>
        )
    }

    handleClick() {
        var deleteAct = this.props.delete;
        var deleteUrl = this.props.deleteUrl;
        var id = this.props.id
        if(confirm("Вы дейстивтельно хотите удалить?")) {
            $.ajax({
                url: deleteUrl + id,
                type: 'DELETE',
                success: function(result) {
                    if(result == false) {
                        alert("Ошибка при удалении")
                    } else {
                        deleteAct(id)
                    }
                    
                }
            })
        }
    }
}