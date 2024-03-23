import React, { useState } from      "react";

import                     "./food-item.scss"
import preloader           from "../../../assets/vector/tail-spin.svg"

export const FoodItem = ({
    id, name, price, description, photo, timesChosen, addToCart, removeFromCart
    }) => {

    // const [isChosen, setIsChosen] = useState(false)
    // const activateEditMode = () => !isChosen ? setIsChosen(true) : setIsChosen(false)

    const onAddToCard = (id) => {
        debugger
        addToCart(id)
    }

    const onRemoveFromCard = (id) => {
        debugger
        removeFromCart(id)
    }

    return (
        <div className="food-item">
            <h2>{name}</h2>
            <div className="food-item__photo">
                <img src={photo ?`${photo}` : preloader} alt="food picture" />
            </div>
            <div className="food-item__description">{description}</div>
            <div>
                <div className="food-item__price">{price}</div>
                {!timesChosen
                ? <button onClick={() => onAddToCard(id)}>Заказать</button>
                : <div className="food-item__counter">
                    <button onClick={() => onRemoveFromCard(id)} >-</button>
                        {timesChosen}
                    <button onClick={() => onAddToCard(id)}>+</button>
                </div>}
           </div>
        </div>
    )
}
