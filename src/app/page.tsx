"use client"
import Header from '@/components/Header/Header'
import React, { useState } from 'react'
import MainContent from './MainContent'
import Footer from '@/components/Footer/Footer'
import Map from '@/components/Map'
import Banner from '@/components/Banner'
import Hero from '@/components/Hero'

function page() {
  const [city, setCity] = useState("sydney");
  const [result, setResult] = useState<any>(null);
  const [country, setCountry] = useState("australia");

  return (
    <>
      <Header position={"sticky"} />

      <Hero setResult={setResult} city={city} setCity={setCity} country={country} setCountry={setCountry} />

      <Banner result={result} />

      <MainContent result={result} city={city} />

      <Map city={city} />

      <Footer />
    </>
  )
}

export default page