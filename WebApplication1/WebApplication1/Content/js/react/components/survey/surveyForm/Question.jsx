import React from 'React'
import ReactQuill from 'react-quill'



export class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Text: props.question,
            indexQ: props.indexQ
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.props.onChange(e, this.state.indexQ)
    }
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.index + 1} вопрос</label>
                <a>
                    <span 
                        data-qid = {this.props.index} 
                        key = {this.props.index}
                        onClick = {this.props.deleteQ}      
                        className = 'glyphicon glyphicon-trash' 
                    />
                </a>
                <ReactQuill 
                    data-id={this.props.indexQ} 
                    value={this.props.Text}
                    onChange={this.onChange}
                    modules={Question.modules}
                    formats={Question.formats} 
                />
            </div>
        )
    }
}

Question.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

  
  Question.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
