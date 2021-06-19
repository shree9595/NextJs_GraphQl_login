import Head from 'next/head'
import Image from 'next/image'
import Base from '../components/Base'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
import { isAutheticated } from '../components/Helper';
import Router from 'next/router';




export default function Home() {

  useEffect(() => {
    !isAutheticated() && Router.push("/signin")
  }, [])

  return (

    <div >
      <Base title="Authenticate Page" description="Home Page">
        <h1>Home</h1>
      </Base>

    </div>
  )
}
