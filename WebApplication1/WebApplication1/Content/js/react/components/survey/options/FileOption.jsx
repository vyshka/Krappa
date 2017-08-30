import React from 'React'

export class FileOption extends React.Component {

    constructor(props) {
        super(props);

        this.filesOnChange = this.filesOnChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.state = {
            fiels: {}
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
            url: "/uploadfile/" + this.props.ResultId,
            method: "POST",
            contentType: false,
            processData: false,
            data: form,
            success: function(path) {
                this.props.onDone(path)
            }.bind(this)
        })
    }
    
    filesOnChange(e) {
        let filesToUpload = e.target.files;
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
                        onChange={this.filesOnChange} 
                    />
                </form>
            </div>
        );
   }
}