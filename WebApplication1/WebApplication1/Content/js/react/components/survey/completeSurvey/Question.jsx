import Raect from 'React'
import ReactQuill from 'react-quill'
import { FileOption } from '../options/FileOption.jsx'
import { DropDownOption } from '../options/DropDownOption.jsx'
import { CheckFormOption } from '../options/CheckFormOption.jsx'

export class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionId: this.props.question.Id,
            selectedValues: ""
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.setState({
            selectedValues: String(this.props.question.Options[0].Id)
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
            Options = this.props.question.Options.map(function(element, index) {
                return(
                    <CheckFormOption 
                        key = {index}
                        index = {index}
                        Text = {element.Text}
                        name = {self.props.question.Text}
                        aid = {element.Id}
                        qid = {self.props.question.Id}
                        onChange = {self.onChange}
                        isChecked = {self.state.selectedValues.split(";").includes(String(element.Id))}
                    />
                )
            }
        )} 

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