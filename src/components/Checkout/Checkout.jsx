import React from           "react";
import { Field,
         reduxForm }        from "redux-form";
import { connect }          from "react-redux";
import { compose }          from "redux";

import                      "./checkout.scss"
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { Preloader }        from "../../common/Preloader/Preloader";
import { ItemCard }         from "./ItemCard/ItemCard";
import { addToCart,
         removeFromCart }   from "../../redux/menu-reducer";
import { required }         from "../../utils/validators/validators";
import { FormControl, 
         createField }      from "../common/FormControls/FormControls";
import { postUserCheckoutTC } from "../../redux/checkout-reducer";

    const Input = FormControl("input")
    const optionElements = (waysOfPay) => waysOfPay.map( way => {
        return <option
            className = {"pay-way"}
            value     = {way}
            key       = {way}>{way}</option>
    })

    let CheckoutForm = ({ handleSubmit, error, waysOfPay }) => {
        return(
            <form onSubmit = { handleSubmit }>
                <div className="wrapper">
                    <div className="checkout__inner">
                        <label>Адресс доставки: </label>{createField("Введите адрес", "address", [required] , Input )}
                    </div>
                    <div className="checkout__inner">
                        <label>Способ оплаты: </label>
                        <Field component="select" name="waysOfPay">
                            {waysOfPay && optionElements(waysOfPay)}
                            <option className="select__header" value={""} hidden={true}>Выбрать способ оплаты</option>
                        </Field>
                    </div>
                        {!!error&& <div className="form-summary-error">
                            Ошибка: {error}
                    </div>}
                    <div className="checkout__buttons">
                        <button>Оформить заказ</button>
                    </div>
                </div>
            </form>
        )
    }
    
    CheckoutForm = reduxForm({
        form: "check-out"
    })(CheckoutForm)

class Checkout extends React.Component {

    render() {

        const {
            isFetching,
            menuItems,
            addToCart,
            totalCost,
            removeFromCart,
            postUserCheckout,
            checkSuccess,
            checkHistory } = this.props

        if (!!isFetching) {
            return <Preloader/>
        }

        if (!!checkSuccess) {
            return <div className="checkout">
                <h2>Заказ успешно оформлен под номером: {checkHistory[checkHistory.length - 1].idDoc}</h2>
            </div>
        }

        let itemElements = menuItems.map( foodItem => {
            const { id, name, price, description, image, timesChosen} = foodItem
             if (!!timesChosen) {
                return (
                    <>
                        <ItemCard
                            key            = {id}
                            id             = {id} 
                            name           = {name}
                            description    = {description}
                            photo          = {image}
                            price          = {price}
                            timesChosen    = {timesChosen}
                            addToCart      = {addToCart}
                            removeFromCart = {removeFromCart}
                            totalCost      = {totalCost}
                        />
                    </>
                )
            }
        })

        const onPostDataCheckout = (formData) => {
            const {
                address,
                waysOfPay
            } = formData
            postUserCheckout(address, waysOfPay)
        }

        let CheckInfo = () => {
            return (
                <div className="checkout__info">
                    {itemElements}
                    <div className="total-cost">Сумма заказа: {totalCost} р.</div>
                    <CheckoutForm
                        onSubmit  = {onPostDataCheckout}
                        waysOfPay = {this.props.waysOfPay}/>
                </div>
            )
        }

        return (
            <div className="checkout">
               <h1>Страница заказа</h1>
               {menuItems.some( foodItem => foodItem.timesChosen)
                ? <CheckInfo/>
                : <div className="empty">Страница заказов пуста</div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching:   state.checkout.isFetching,
    menuItems:    state.menu.menuData,
    totalCost:    state.menu.totalCost,
    waysOfPay:    state.checkout.waysOfPay,
    checkSuccess: state.checkout.checkSuccess,
    checkHistory: state.checkout.checkHistory
})

export default compose(connect(mapStateToProps, 
    {addToCart,
    removeFromCart, postUserCheckout: postUserCheckoutTC}),
withAuthRedirect)(Checkout)
