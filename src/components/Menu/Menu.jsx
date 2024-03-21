import React from      "react";

import                 "./menu.scss"
import { connect }     from "react-redux";
import { compose }     from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class Menu extends React.Component {

    render() {

        return (
            <div>
                Menu
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps),
    withAuthRedirect)(Menu)
