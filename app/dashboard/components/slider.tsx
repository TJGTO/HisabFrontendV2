"use client";

import { useState } from "react";
import { SlidingImageObject } from "../domain";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Slider() {
  const slides: Array<SlidingImageObject> = [
    {
      URL: "https://firebasestorage.googleapis.com/v0/b/wfgkol2023.appspot.com/o/sliderPictures%2FWhatsApp123.jpeg?alt=media&token=cc9de9e1-4c48-4b5f-8814-94fe46ba2691",
    },
    {
      URL: "https://firebasestorage.googleapis.com/v0/b/wfgkol2023.appspot.com/o/sliderPictures%2FIMG-20231210-WA0013.jpg?alt=media&token=6d632b6e-c68d-45c5-bc29-7fd4286d5ccc",
    },
    {
      URL: "https://firebasestorage.googleapis.com/v0/b/wfgkol2023.appspot.com/o/sliderPictures%2FWhatsApp1234.jpeg?alt=media&token=a241f350-357f-46b3-9d3b-a2a4962d690b",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[500px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].URL})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <KeyboardArrowLeftIcon onClick={prevSlide} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRightIcon onClick={nextSlide} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <FiberManualRecordIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
