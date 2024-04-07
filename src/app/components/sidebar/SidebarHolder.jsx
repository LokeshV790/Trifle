"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";

function SidebarHolder() {
    const [width, setWidth] = useState(0);
    
    useLayoutEffect(() => {
      
      
        function changeWidth(){
            
            if(window.innerWidth < 1024 && window.innerWidth > 640){
                setWidth(80)
            }
            else if(window.innerWidth <= 640){
              setWidth(0)
            }
            else{
                setWidth(300)
            }
        }
        changeWidth()
        window.addEventListener("resize", changeWidth);
        return () => window.removeEventListener("resize", changeWidth)
    }, [])

  return (
    <div  style={{width: width}} className="relative shrink-0 transition-all ">
      <Sidebar width={width}></Sidebar>
    </div>
  );
}

export default SidebarHolder;
