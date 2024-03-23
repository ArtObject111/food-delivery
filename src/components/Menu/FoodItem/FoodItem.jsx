import React, { useState } from      "react";

import                     "./food-item.scss"
import preloader           from "../../../assets/vector/tail-spin.svg"

export const FoodItem = ({
    name, price, description, photo,
    }) => {

    const [isChosen, setIsChosen] = useState(false)
    const activateEditMode = () => !isChosen ? setIsChosen(true) : setIsChosen(false)

    return (
        <div className="food-item">
            <h2>{name}</h2>
            <div className="food-item__photo">
                <img src={photo ?`${photo}` : preloader} alt="food picture" />
            </div>
            <div className="food-item__description">{description}</div>
            <div>
                <div className="food-item__price">{price}</div>
                {!isChosen
                ? <button onClick={activateEditMode}>Заказать</button>
                : <div className="food-item__counter">
                    <button onClick={activateEditMode} >-</button>
                        countItem
                    <button>+</button>
                </div>}
           </div>
        </div>
    )
}
