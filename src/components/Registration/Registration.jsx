import React            from "react";
import { reduxForm }    from "redux-form";
import { 
    NavLink,
    Navigate }          from "react-router-dom";
 
import                  "./registration.scss"
import { 
    FormControl, 
    createField }       from "../common/FormControls/FormControls";
import { signUpUserTC } from "../../redux/auth-reducer";
import { connect }      from "react-redux";
import { 
    maxLengthCreator,
    required }          from "../../utils/validators/validators";

    const Input       = FormControl("input")
    const maxLength30 = maxLengthCreator(30)
    const maxLength15 = maxLengthCreator(15)

let CreateUserForm = ({ handleSubmit, error }) => {
    console.log("CreateUserForm")
    return(
        <form onSubmit = { handleSubmit }>
            <div className="wrapper">
                <div className="auth__inner"><label>Введите свой email: </label>{createField("Введите email", "email", [required, maxLength30], Input )}</div>
                <div className="auth__inner"><label>Придумайте пароль: </label>{createField("Введите пароль", "password", [required, maxLength15], Input)}</div>
                {!!error&& <div className="form-summary-error">
                    Ошибка: {error}
                </div>}
                <div className="auth__buttons">
                    <button>Зарегистрироваться</button>
                </div>
                <NavLink to="/login">Войти при помощи логина и пароля</NavLink>
            </div>
        </form>
    )
}

CreateUserForm = reduxForm({
    form: "create-user"
})(CreateUserForm)

class Registration extends React.Component{

    onSignIn = (formData) => {
        const {
            email,
            password
        } = formData
        this.props.signUpUser(email, password)
    }

    render () {

        const {
            isAuth
        } = this.props
        
        if (!!isAuth) {
            return <Navigate to="/menu" />
        }


        return (
            <div className="registration">
                <h1>
                    Регистрация
                </h1>
                <CreateUserForm onSubmit={this.onSignIn}/>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {signUpUser: signUpUserTC})(Registration)
