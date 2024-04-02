import React from 'react';
function Dp(props) {
  return(<>{(props.small)?<div  >
      <img src={props.image} alt="" width="100%" />
  </div>:<div className='adjust_dp'>
      <img src={props.image} alt="" width="100%" />
  </div>}
  </> );
}

export default Dp;
