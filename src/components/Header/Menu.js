import React from 'react';
import Link from "next/link";

const Menu = () => {
  return (
    <>
      <div className="header-menu">
        <Link href="/about">
          <a><span>About</span></a>
        </Link>
        <Link href="/contact">
          <a><span>Contact</span></a>
        </Link>
      </div>
      <Link href="/add">
        <a className="btn btn-white">Add a game</a>
      </Link>
    </>
  )
};

export default Menu
