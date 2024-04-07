"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

function Main({ children }) {
  const [m, setM] = useState(0);
  const [w, setW] = useState(0);
  useEffect(() => {
    function setMargin() {
      const rrect = document.getElementById("sidebar").getClientRects();
      const lrect = document.getElementById("quickaccess").getClientRects();
      const width = document.documentElement.clientWidth;
      setW(width - (rrect[0].width + lrect[0]?.width))
      setM(rrect[0].width);
    }
    setTimeout(setMargin, 0);
    setMargin();
    window.addEventListener("resize", setMargin);
    return () => window.removeEventListener("resize", setMargin);
  }, []);
  return (
    <main>
      <section style={{ marginLeft: m, width: w }} className="h-[500vh] relative">
        {children}
      </section>
    </main>
  );
}

export default Main;
