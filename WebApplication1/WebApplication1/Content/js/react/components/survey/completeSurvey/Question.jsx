import React from 'React'
import ReactQuill from 'react-quill'
import { FileOption } from '../options/FileOption.jsx'
import { DropDownOption } from '../options/DropDownOption.jsx'
import { CheckForm } from '../options/CheckForm.jsx'

export class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionId: this.props.question.Id
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        var text = ""
        if(this.props.question.Options[0]) {
            text = this.props.question.Options[0].Text
        }
        this.setState({
            selectedValues: text
        })
    }

    onChange(e) {
        this.setState({
            selectedValues: e
        })
        this.props.onChange(e, this.state.questionId)
    }

    render() {
        var self = this
        var Options
        if(this.props.question.QuestionType.Type == "options") {
            Options = <CheckForm 
                        onChange = {this.onChange}
                        question = {this.props.question}
                    />
        } 

        if(this.props.question.QuestionType.Type == "dropdown") {
            Options = <DropDownOption 
                        options = {this.props.question.Options}
                        onChange = {this.onChange}
                    />
        }


        if(this.props.question.QuestionType.Type == "text") {
            Options = <ReactQuill 
                data-id={this.props.indexQ} 
                onChange={this.onChange}
                modules={Question.modules}
                formats={Question.formats} 
            />
        }

        if(this.props.question.QuestionType.Type == "file") {
            Options = <FileOption
                        ResultId = {this.props.ResultId}
                        onDone = {this.onChange}
                     />
        }

        return(
            <div className = "panel panel-default">
                <div className = "panel-body">
                    <fieldset className="form-group">
                        <legend dangerouslySetInnerHTML={{__html: this.props.question.Text}} />
                        {Options}
                    </fieldset>
                </div>
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