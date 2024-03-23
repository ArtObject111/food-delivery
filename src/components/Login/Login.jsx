import React from       "react";
 
import                  "./login.scss"
import { reduxForm }    from "redux-form";
import { 
    FormControl, 
    createField }       from "../common/FormControls/FormControls";
import { 
    NavLink, 
    Navigate }          from "react-router-dom";
import { connect }      from "react-redux";
import { signInUserTC } from "../../redux/auth-reducer";
import { required }     from "../../utils/validators/validators";

const Input = FormControl("input")

let AuthUserForm = ({ handleSubmit, error }) => {
console.log("AuthUserForm")
    return(
        <form onSubmit = { handleSubmit }>
            <div className="wrapper">
                <div className="auth__inner"><label>Логин: </label>{createField("Введите email", "email", [required] , Input )}</div>
                <div className="auth__inner"><label>Пароль: </label>{createField("Введите пароль", "password", [required], Input,  {type: "password"})}</div>
                {!!error&& <div className="form-summary-error">
                    Ошибка: {error}
            </div>}
            <div className="auth__buttons">
                <button>Войти</button>
                <NavLink to="/registration"><button>Регистрация</button></NavLink>
            </div>
            </div>
        </form>
    )
}

AuthUserForm = reduxForm({
    form: "auth-user"
})(AuthUserForm)

class Login extends React.Component {

    onSignIn = (formData) => {
        const {
            email,
            password
        } = formData

        this.props.signInUser(email, password)
    }

    render () {

        const {
            isAuth
        } = this.props

        
        
        if (!!isAuth) {
            return <Navigate to="/menu" />
        }

        return (
            <div className="auth">
                <h1>
                    Вход
                </h1>
                <AuthUserForm onSubmit={this.onSignIn}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {signInUser: signInUserTC})(Login)
