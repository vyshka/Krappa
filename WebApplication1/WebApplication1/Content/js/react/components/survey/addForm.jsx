import React from 'React'

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
            url: "/api/vacancies/CreateVacancy",
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

                <div className="form-group">
                    <div>
                        <button onClick={this.handleClick} type="button" id="createBtn" className="btn btn-default" >Добавить</button>                    
                    </div>
                </div> 
            </form>
        )
    }
}

export class AddUserForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectValue: 0,
            userName: "",
            userNameError: "",
            Email: "",
            EmailError: "",
            password: "",
            passwordError: "",
            SelectedRoleId: ""
                       
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.change = this.change.bind(this);
        this.validate = this.validate.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState({
            userName: "",
            userNameError: "",
            Email: "",
            EmailError: "",
            password: "",
            passwordError: "",
            SelectedRoleId: ""
        })
    }

    validate() {
        const errors = {};
        let isError = false;
        if(this.state.password.length < 6) {
            isError = true;
            errors.passwordError = "Пароль должен быть как минимум 6 символов";
        }

        if(this.state.userName == "") {
            isError = true;
            errors.userNameError = "Поле Имя обязательно для заполнения"
        }

        
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!reg.test(this.state.Email)) {
            isError = true;
            errors.EmailError = "Неверный форма Email";
        }
        

        if(isError) {
            this.setState({
                passwordError: errors.passwordError,
                userNameError: errors.userNameError,
                EmailError: errors.EmailError
            })
        }
        return isError;
    }

    change(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleClick() {
        var self = this;
        if(!self.validate()){
            var AdminCreateUserModel = {
                Email: this.state.Email,
                userName: this.state.userName,
                Password: this.state.password,
                SelectedRoleId: this.state.selectValue
            }
            var changeState = this.setState;
            $.ajax({
                url: "/api/user/CreateUser",
                contentType: "application/json",
                type: "POST",
                data: JSON.stringify(AdminCreateUserModel),
                success: function(data) {
                    if(data != null) {
                        self.props.add(data);
                        self.clearState();
                    } else {
                        alert("Ошибка при создании пользователя");
                    }
                    
                    
                }
            })
        }
    }


    handleChange(event) {
        this.setState({selectValue: event.target.value});
    }

    render() {
        return(
            <form className="form-gorizontal">
                <h3>Создать пользователя</h3>
                
                <FormGroup 
                    id="userName" 
                    text="Имя" 
                    value={this.state.userName} 
                    onChange={e => this.change(e)} 
                    error={this.state.userNameError}
                />    

                <FormGroup 
                    id="Email" 
                    text="Email" 
                    value={this.state.Email} 
                    onChange={e => this.change(e)} 
                    error={this.state.EmailError}
                />   

                <FormGroup 
                    type="password" 
                    id="password" 
                    text="Пароль" 
                    value={this.state.password} 
                    onChange={e => this.change(e)} 
                    error={this.state.passwordError}
                />    

                <div>
                    <label className="control-label">Роль</label>
                    <div>
                        <select className="form-control" id="SelectedRoleId" onChange={e => this.change(e)}  value={this.state.SelectedRoleId} >
                            <option value="0">Администратор</option>
                            <option value="1">Пользователь</option>
                        </select>
                    </div>
                </div>

                <Button 
                    handleClick={this.handleClick}
                    id="createBtn"
                    text="Добавить"
                />
            </form>
        )
    }
}

class Button extends React.Component {
    render() {
        return(
            <div className="form-group">
                <button onClick={this.props.handleClick} type="button" id={this.props.id} className="btn btn-default" >{this.props.text}</button>                    
            </div>
        )
    }
}

class FormGroup extends React.Component {
    render() {
        return(
            <div className="form-group">
                <label className="control-label">{this.props.text}</label>
                <input type={this.props.type} className="form-control" id={this.props.id} value={this.props.value} onChange = {this.props.onChange} />
                <ErrorText text={this.props.error} />
            </div>
            
        )
    }
}

class ErrorText extends React.Component{
    render() {
        return(
            <span className="text-danger field-validation-error">{this.props.text}</span>
        )
    }
}






