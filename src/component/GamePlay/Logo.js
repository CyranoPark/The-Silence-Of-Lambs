import React from 'react';
import { FaWindowClose, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const Logo = props => {
  return (
    <div className='top-logo'>
      <div>The Silence Of Lambs</div>
      <div>USER : {props.userName}</div>
    </div>
  )
};

export default Logo;
