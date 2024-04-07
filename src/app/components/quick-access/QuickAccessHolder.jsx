"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import QuickAccess from './QuickAccess';

function QuickAccessHolder({ children, ...others}) {
  const [width, setWidth] = useState(400);
    useLayoutEffect(() => {
        function changeWidth(){
            
            if(window.innerWidth < 1024){
                setWidth(0)
            }
            else{
                setWidth(400)
            }
        }
        changeWidth()
        window.addEventListener("resize", changeWidth);
        return () => window.removeEventListener("resize", changeWidth)
    }, [])

  return (
    <div  style={{width: width}} className="relative  shrink-0 transition-all">
      <QuickAccess {...others} width={width}>{children}</QuickAccess>
    </div>
)}

export default QuickAccessHolder