import React from "react";

type ImageProps = {
  src: string;
  id?: string;
  alt: string;
};

const Image = ({ src, id, alt }: ImageProps) => {
  return <img src={src} id={id} alt={alt} />;
};

export default Image;
