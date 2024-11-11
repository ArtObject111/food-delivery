import React from      "react";

import                     "./food-item.scss"
import preloader           from "../../../assets/vector/tail-spin-white.svg"

export const FoodItem = ({
    id, name, price,
    description, photo,
    timesChosen, addToCart,
    removeFromCart }) => {

    const onAddToCard = (id) => {
        addToCart(id)
    }

    const onRemoveFromCard = (id) => {
        removeFromCart(id)
    }

    const Buttons = () => {
        if (!timesChosen) {
            return <div className="food-item__long">
                <button onClick={() => onAddToCard(id)}>Заказать</button>
            </div>
        } else {
            return <div className="food-item__counter">
                <button onClick={() => onRemoveFromCard(id)} >-</button>
                   <label> {timesChosen} </label>
                <button onClick={() => onAddToCard(id)}>+</button>
            </div>
        }
    }

    return (
        <div className="food-item">
            <h2>{name}</h2>
            <div className="food-item__photo">
                <img src={photo ?`${photo}` : preloader} alt="food picture" />
            </div>
            <div className="food-item__description">{description}</div>
            <div className="food-item__addfull">
                <Buttons/>
                <div className="food-item__price">{price} р.</div>
           </div>
        </div>
    )
}
