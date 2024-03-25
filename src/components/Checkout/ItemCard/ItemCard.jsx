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
        addToCart(id)
    }

    const onRemoveFromCard = (id) => {
        removeFromCart(id)
    }

    return (
        <div className="item-card">
            <div className="item-card__info">
                <img className="item-card__photo" src={photo ?`${photo}` : preloader} alt="food picture" />
                <div className="item-card__primary">
                    <h2>{name}</h2>
                    <div className="item-card__description">{description}</div>
                </div>
            </div>
            <div className="item-card__addfull">
                <div className="item-card__counter">
                    <button onClick={() => onRemoveFromCard(id)} >-</button>
                       <label> {timesChosen} </label>
                    <button onClick={() => onAddToCard(id)}>+</button>
                </div>
                <div className="item-card__price">{price} р.</div>
           </div>
        </div>
    )
}
