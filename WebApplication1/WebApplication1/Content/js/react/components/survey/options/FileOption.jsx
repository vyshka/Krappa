import React from 'React'
import FileBase64 from 'react-file-base64';

export class FileOption extends React.Component {
    render() {
        return(
            <FileBase64
                multiple = { false }
                onDone = {this.props.onDone}
            />
        )
    }
}