import React, { useRef, useEffect } from 'react';
import $ from 'jquery'; // Make sure you have jQuery installed as well
import { Link } from 'react-router-dom';

const Extra = (props) => {
  const popoverRef = useRef(null);
useEffect(() => {
    // Initialize the popover using Bootstrap's JavaScript
    const popover = new window.bootstrap.Popover(popoverRef.current);

    return () => {
      // Destroy the popover instance when the component unmounts
      popover.dispose();
    };
  }, []);

  return (
        <Link  to={props.url} className=" text-center nav-link mb-0"     
        ref={popoverRef}
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-placement="right"
        title={props.title}>
            {props.children}
        {/* <MdDashboard color={'#fff'} size={25}/> */}
      </Link>
  );
};

export default Extra;
