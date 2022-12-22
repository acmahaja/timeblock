import React from "react";

import '../styles/components/TextField.css'
import '../styles/components/Light/TextField.css'
import '../styles/components/Dark/TextField.css'


function TextField({ name, type, setText, icon, placeholder,           required, error }) {
  function updateText(event) {
    setText(event.target.value);
  }

  return (
    <div className={`TextField ${name} ${error ? "error" : ""}`}>
      <label htmlFor={name}>{name}</label>
      <span data-icon={icon}>
        <input
          placeholder={placeholder}
          onChange={updateText}
          type={type}
          name={name}
          id={name}
          required={required==="true"}
        />
      </span>

    </div>
  );
}

export default TextField;
