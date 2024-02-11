import React from "react";

const DetailsThumb = ({ images, tab, myRef }) => {
  return (
    <div className="thumb" ref={myRef}>
      {images &&
        images.map((img, index) => (
          <img src={img} alt="" key={index} onClick={() => tab(index)} />
        ))}
    </div>
  );
};

export default DetailsThumb;
