import React                from "react";
import { connect }          from "react-redux";
import { compose }          from "redux";

import                      "./menu.scss"
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { FoodItem }         from "./FoodItem/FoodItem";
import { getMenuTC }        from "../../redux/menu-reducer";
import { Preloader }        from "../../common/Preloader/Preloader";
import InfiniteScroll       from "react-infinite-scroll-component";

class Menu extends React.Component {

    componentDidMount() {
        this.props.getMenu(this.props.limitItems)
    }    

    render() {

        const {
            isLoading,
            menuItems,
            limitItems,
            getMenu
        } = this.props

        const handleScrollMenu = () => {
            getMenu(limitItems, !isLoading)
        }

        return (
            <>
                <h1>
                    Меню
                </h1>
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
                                const { id, name, price, description, image} = foodItem
                                    return <FoodItem
                                        key         = {id}
                                        name        = {name}
                                        price       = {price}
                                        description = {description}
                                        photo       = {image}
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
    isLoading:  state.menu.isLoading,
    menuItems:  state.menu.menuData,
    limitItems: state.menu.scrollSize
})

export default compose(
    connect(mapStateToProps, {getMenu: getMenuTC}),
    withAuthRedirect)(Menu)
