import React from "react";

const logopng =
  "https://drive.google.com/uc?export=view&id=1irw-9jgO0PlDIEPoKddBQAv9jN4kutPM";

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
