import React from 'React'
import { Button } from './Button.jsx'
import { FormGroup } from './FormGroup.jsx'

export class AddVacancyForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            city: "",
            url:""
        }

        this.handleClick = this.handleClick.bind(this);
        this.change = this.change.bind(this);
        this.clearState = this.clearState.bind(this);

    }

    change(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    clearState() {
        this.setState({
            name:"",
            city: "",
            url: ""
        })
    }

    handleClick() {
        var self = this;
        var Vacancies = {
            Url: this.state.url,
            City: this.state.city,
            name: this.state.name
        }
        $.ajax({
            url: "/vacancies",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(Vacancies),
            success: function(data) {
                Vacancies.Id = data;    
                self.props.add(Vacancies);
                self.clearState();
                
                
            }
        })
    }

    render() {
        return(
            <form className="form-horizontal">
                <h3>Добавить вакансию</h3>
                <FormGroup 
                    id="name"
                    text="Название"
                    onChange={e => this.change(e)} 
                    value={this.state.name}
                />

                <FormGroup 
                    id="city"
                    text="Город"
                    onChange={e => this.change(e)} 
                    value={this.state.city}
                />

                <FormGroup 
                    id="url"
                    text="Url"
                    onChange={e => this.change(e)} 
                    value={this.state.url}
                />
                <Button 
                    Action={this.handleClick}
                    id={"createBtn"}
                    text={"Добавить"}
                />
            </form>
        )
    }
}