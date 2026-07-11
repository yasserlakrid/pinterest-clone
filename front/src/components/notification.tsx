import React, { useEffect, useRef } from "react";
function Notification () {
   const item = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(item.current? item.current.parentElement : "no parent")

  }, [item.current]);
  return (
    <>
       <div className="param create  " ref={item}>
<div>this is a notification bar</div>
    </div>
    </>
  );
}
export default Notification ;