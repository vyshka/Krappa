import React from 'React'
import FileBase64 from 'react-file-base64';

export class FileOption extends React.Component {

    constructor(props) {
        super(props);

        this.filesOnChange = this.filesOnChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.state = {
            FileServiceResponse: 'Выберите файл',
            fields: {}
        }
    }



    uploadFile() {
        let state = this.state;

        let form = new FormData();

        for (var index = 0; index < state.files.length; index++) {
            var element = state.files[index];
            form.append('file', element);
        }

        $.ajax({
            url: "/api/Result/UploadFile",
            type: "POST",
            contentType: false,
            processData: false,
            data: form,
            success: function(path) {
                this.setState({
                    FileServiceResponse: "Файл загружен"
                })
                this.props.onDone(path)
            }.bind(this)
        })
    }
    
    filesOnChange(sender) {
        let filesToUpload = sender.target.files;
        let state = this.state;

        this.setState({
            ...state,
            files: filesToUpload
        }, this.uploadFile);
    }


    render() {
        return (
            <div>
                <form>
                    <input 
                        type="file" 
                        id="case-one" 
                        onChange={this.filesOnChange} />
                </form>
            </div>
        );
   }
}