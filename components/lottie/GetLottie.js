import React, { useEffect } from "react";
import { rem } from "polished";
import lottie from "lottie-web";
import particle from "./prescription.json";

const GetLottie = () => {
  useEffect(() => {
    const container = document.querySelector("#container");
    const instance = lottie.loadAnimation({
      container: container,
      animationData: particle,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
    return () => instance.destroy();
  });

  return (
    <div style={{ margin: `${rem(28)} ${rem(39.2)} 0 ${rem(39)}` }}>
      <div id="container" style={{ width: "100%", height: 200 }} />
    </div>
  );
};

export default GetLottie;
