import React             from "react";
import { connect }       from "react-redux";
import Icon              from "../../assets/vector/icon.svg"
import ProfileIcon       from "../../assets/vector/user-icon.svg"
import                   "./header.scss"
import { signOutUserTC } from "../../redux/auth-reducer";

class Header extends React.Component {

    onSignOut = () => {
        this.props.signOutUser()
    }

    render() {

        const {
            isAuth,
            email
        } = this.props

        return (
            <div className="header">
                <div className="logo">
                    <img alt="Icon" src={Icon} />
                    <label>Food Delivery</label>
                </div>
                {!!isAuth && <div className="login-block">
                    <img src={ProfileIcon} alt="Profile icon" />
                    <label>{!!email && email}</label>
                    <a onClick={this.onSignOut}>Выйти</a>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email
})

export default connect(mapStateToProps, {signOutUser: signOutUserTC})(Header)
