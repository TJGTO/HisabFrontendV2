import React from "react";

const logopng =
  "https://firebasestorage.googleapis.com/v0/b/wfgkol2023.appspot.com/o/WFG%20(1).png?alt=media&token=4d23ecc0-81dc-4f03-9b13-dcb6e88a5d11";

type logoProps = {
  width?: number;
  height?: number;
};

function WFGLogo(props: logoProps) {
  return (
    <img
      src={logopng}
      width={props.width || 40}
      height={props.height || 40}
      alt="WFG_LOGO"
    />
  );
}

export default WFGLogo;
