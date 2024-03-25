import React                from "react";
import { connect }          from "react-redux";
import { compose }          from "redux";

import                      "./menu.scss"
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { FoodItem }         from "./FoodItem/FoodItem";
import { addToCart, getMenuTC, removeFromCart }        from "../../redux/menu-reducer";
import { Preloader }        from "../../common/Preloader/Preloader";
import InfiniteScroll       from "react-infinite-scroll-component";
import CartIcon             from "../../assets/vector/new-cart.svg"
import { NavLink }          from "react-router-dom";

class Menu extends React.Component {

    componentDidMount() {
        const {
            isInitializedMenu,
            limitItems,
            getMenu
        } = this.props
        !isInitializedMenu && getMenu(limitItems)
    }

    render() {
        console.log("Menu")

        const {
            isLoading,
            menuItems,
            limitItems,
            chosenFood,
            getMenu,
            addToCart,
            removeFromCart
        } = this.props

        const handleScrollMenu = () => {
            getMenu(limitItems, !isLoading)
        }

        return (
            <>
                <h1>
                    Меню
                </h1>
                <NavLink to="/checkout">
                    <div className="cart-icon">
                        <img src={CartIcon} alt="cart icon"/>
                    </div>
                </NavLink>
                <div className="menu">
                    <InfiniteScroll
                        dataLength = {menuItems.length} //This is important field to render the next data
                        next       = {handleScrollMenu}
                        hasMore    = {true}
                        loader     = {<Preloader/>}
                        endMessage = {
                          <p style = {{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }>
                        <div className="menu__content">
                            {menuItems && menuItems.map( foodItem => {
                                const { id, name, price, description, image, timesChosen } = foodItem
                                    return <FoodItem
                                        key            = {id}
                                        id             = {id}
                                        name           = {name}
                                        price          = {price}
                                        description    = {description}
                                        photo          = {image}
                                        timesChosen    = {timesChosen}
                                        addToCart      = {addToCart}
                                        removeFromCart = {removeFromCart}
                                        chosenFood     = {chosenFood}
                                    /> 
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading:         state.menu.isLoading,
    menuItems:         state.menu.menuData,
    limitItems:        state.menu.scrollSize,
    isInitializedMenu: state.menu.isInitializedMenu,
    chosenFood:        state.menu.chosenFood
})

export default compose(
    connect(mapStateToProps, 
        {addToCart,
        removeFromCart,
        getMenu: getMenuTC}),
    withAuthRedirect)(Menu)
