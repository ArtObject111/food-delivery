import React             from "react";
import { connect }       from "react-redux";
import Icon              from "../../assets/vector/icon.svg"
import ProfileIcon       from "../../assets/vector/user-icon.svg"
import ArrowBack         from "../../assets/vector/arrow-back.svg"
import                   "./header.scss"
import { signOutUserTC } from "../../redux/auth-reducer";
import { NavLink, useLocation } from "react-router-dom";
import { compose } from "redux";

class Header extends React.Component {

    onSignOut = () => {
        this.props.signOutUser()
    }

    render() {
        const checkoutUrl = this.props.router.location.pathname
        const {
            isAuth,
            email
        } = this.props

        return (
            <div className="header">
                {checkoutUrl === "/checkout" && 
                    <div className="back">
                    <img src={ ArrowBack } alt="Arrow back" />
                    <NavLink to="/menu">Меню</NavLink>
                </div>}
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

const withRouter = (WrappedContainer) => {
    return (props) => {
        let location = useLocation();

        return (
            <WrappedContainer
                {...props}
                router={{location}}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email
})

export default compose(
    connect(mapStateToProps, {signOutUser: signOutUserTC}),
    withRouter)(Header)
