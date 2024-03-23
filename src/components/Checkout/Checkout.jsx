import React from           "react";

import                      "./checkout.scss"
import { connect }          from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose }          from "redux";
import { Preloader }        from "../../common/Preloader/Preloader";
import { ItemCard }         from "./ItemCard/ItemCard";
import { 
    addToCart,
    getMenuTC,
    removeFromCart }        from "../../redux/menu-reducer";


class Checkout extends React.Component {

    render() {

        const {
            isLoading,
            menuItems,
            addToCart,
            removeFromCart } = this.props

        if (isLoading === true) {
            return <Preloader/>
        }

        return (
            <div className="checkout">
               <h1>Страница заказа</h1>
               {menuItems && menuItems.map( foodItem => {
                debugger
                const { id, name, price, description, image, timesChosen} = foodItem
                 if (!!timesChosen) {
                    debugger
                        return <ItemCard
                            key            = {{id}}
                            id             = {id} 
                            name           = {name}
                            description    = {description}
                            photo          = {image}
                            price          = {price}
                            timesChosen    = {timesChosen}
                            addToCart      = {addToCart}
                            removeFromCart = {removeFromCart}
                       />}
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading:  state.auth.isFetching,
    menuItems:  state.menu.menuData,
    limitItems: state.menu.scrollSize
})

export default compose(connect(mapStateToProps, 
    {addToCart,
    removeFromCart,
    getMenu: getMenuTC}),
withAuthRedirect)(Checkout)
