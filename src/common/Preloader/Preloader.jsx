import React     from "react";

import           "./preloader.scss"
import preloader from "../../assets/vector/tail-spin.svg";

export const Preloader = ({ upper }) => {
    return (
        <div className={`preloader-wrapper ${upper && upper}`}>
          <img src={preloader} alt="Preloader"/>
        </div>
      )
}
