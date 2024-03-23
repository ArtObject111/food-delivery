import React, { useState } from      "react";

import                     "./item-card.scss"
import preloader           from "../../../assets/vector/tail-spin.svg"

export const ItemCard = ({
    id,
    name,
    price,
    description,
    photo,
    timesChosen,
    addToCart,
    removeFromCart
    }) => {

    const onAddToCard = (id) => {
        debugger
        addToCart(id)
    }

    const onRemoveFromCard = (id) => {
        debugger
        removeFromCart(id)
    }

    return (
        <div className="item-card">
            <h2>{name}</h2>
            <div className="item-card__photo">
                <img src={photo ?`${photo}` : preloader} alt="food picture" />
            </div>
            <div className="item-card__description">{description}</div>
            <div>
                <div className="item-card__price">{price}</div>
                <div className="item-card__counter">
                    <button onClick={() => onRemoveFromCard(id)} >-</button>
                        {timesChosen}
                    <button onClick={() => onAddToCard(id)}>+</button>
                </div>
           </div>
        </div>
    )
}
