import React from "react";
import styled from "styled-components";

const Button = ({ children, type = "button", onClick }) => {
  return (
    <StyledWrapper>
      <button className="slice" type={type} onClick={onClick}>
        <span className="text">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .slice {
    --c1: #202020;
    --c2: #00a1b7;
    --size-letter: 18px;
    padding: 0.5em 1em;
    font-size: var(--size-letter);
    background-color: transparent;
    border: calc(var(--size-letter) / 6) solid var(--c2);
    border-radius: 0.2em;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: 300ms cubic-bezier(0.83, 0, 0.17, 1);
    width: 100%;

    & > .text {
      font-weight: 700;
      color: var(--c2);
      position: relative;
      z-index: 1;
      transition: color 700ms cubic-bezier(0.83, 0, 0.17, 1);
    }
  }

  .slice::after {
    content: "";
    width: 0;
    height: calc(300% + 1em);
    position: absolute;
    translate: -50% -50%;
    inset: 50%;
    rotate: 30deg;
    background-color: var(--c2);
    transition: 1000ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .slice:hover > .text {
    color: var(--c1);
  }

  .slice:hover::after {
    width: calc(120% + 1em);
  }

  .slice:active {
    scale: 0.98;
    filter: brightness(0.9);
  }
`;

export default Button;
