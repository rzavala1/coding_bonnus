import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Iframe = (props) => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);

  useEffect(() => {
    const div = document.createElement("div");
    setContainer(div);
  }, []);

  useEffect(() => {
    if (container) {
      newWindow.current = window.open(
        props.url,
        "",
        "width=600,height=600,left=170,top=100"
      );
      newWindow.current.document.body.appendChild(container);
      const curWindow = newWindow.current;

      return () => curWindow.close();
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default Iframe;