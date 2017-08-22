import React from 'React'

export class Button extends React.Component {
    render() {
        return(
            <div className="form-group">
                    <button 
                        data-index={this.props.index} 
                        onClick={this.props.Action} 
                        id={this.props.id} 
                        className="btn btn-default" >
                        {this.props.text}
                    </button>                    
            </div>
        )
    }
}