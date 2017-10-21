import React from "react";
import Link from "next/link";
import uuid from'uuid';

const getToken = () => uuid();

const Home = () => {
  return (
    <h1>Token: {getToken()}</h1>
  )
}
export default Home;
