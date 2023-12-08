import React from "react";
import Image from "next/image";

const logopng =
  "https://drive.google.com/uc?export=view&id=10ROLMv8jcIpmnLJlKC0vZ0ubQVsGHhTz";

type logoProps = {
  width?: number;
  height?: number;
};

function WFGLogo(props: logoProps) {
  return (
    <Image
      src={logopng}
      width={props.width || 40}
      height={props.height || 40}
      alt="WFG_LOGO"
    />
  );
}

export default WFGLogo;
