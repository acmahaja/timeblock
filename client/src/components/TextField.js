import React from "react";

import '../styles/components/TextField.css'
import '../styles/components/Light/TextField.css'
import '../styles/components/Dark/TextField.css'


function TextField({ name, type, setText, icon, placeholder }) {
  function updateText(event) {
    setText(event.target.value);
  }

  return (
    <div className={`TextField ${name}`}>
      <label htmlFor={name}>{name}</label>
      <span data-icon={icon}>
        <input
          placeholder={placeholder}
          onChange={updateText}
          type={type}
          name={name}
          id={name}
        />
      </span>

    </div>
  );
}

export default TextField;
