import React from 'react';

export var Square = function (props) {
    console.log(props.isWinner);
    let property = props.isWinner ? "square squareSelected" : "square";
    return (
        <button className={property} onClick={props.onClick}>
            {props.value}
        </button>
    );
}