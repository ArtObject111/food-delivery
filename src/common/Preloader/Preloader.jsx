import React     from "react";

import           "./preloader.scss"
import preloader from "../../assets/vector/tail-spin.svg";

export const Preloader = () => {
    return (
        <div className="preloader-wrapper">
          <img src={preloader} alt="Preloader"/>
        </div>
      )
}
