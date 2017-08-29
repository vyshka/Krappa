import React from 'React'
import { DefOption } from '../options/DefOption.jsx'
import { FileOption } from '../options/FileOption.jsx'


export class Options extends React.Component {
    render() {
        if(this.props.qType == "options") {
            return(
                <DefOption {...this.props} />
            )    
        } 
        
        if(this.props.qType == "text") {
            return(
                <input 
                    placeholder = "Текст ответа" 
                    className = "form-control" 
                />
            )
        }

        if(this.props.qType == "file") {
            return(
                <FileOption />
            )
        }        

        if(this.props.qType == "dropdown") {
            return(
                <DefOption {...this.props}/>
            )
        }        
    }
}