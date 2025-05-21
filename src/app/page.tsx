"use client";

import Header from '@/components/Header/Header';
import React, { useState, useRef, useEffect } from 'react';
import MainContent from './MainContent';
import Footer from '@/components/Footer/Footer';
import Map from '@/components/Map';
import Banner from '@/components/Banner';
import Hero from '@/components/Hero';
import GetEmail from '@/components/GetEmail';
import SplashCursor from "@/Animations/SplashCursor/SplashCursor";


function Page() {
  const [city, setCity] = useState("Sydney");
  const [result, setResult] = useState<any>(null);
  const [country, setCountry] = useState("Australia");
  const [rsCity, setRsCity] = useState("Sydney");
  const [rsCountry, setRsCountry] = useState("australia");

  const mainContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (result && mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div className="bg-white dark:bg-neutral-900">
      <SplashCursor/>
      <Header position="sticky" />

      <Hero
        setResult={setResult}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        setRsCity={setRsCity}
        setRsCountry={setRsCountry}
      />

      <Banner
        setResult={setResult}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        setRsCity={setRsCity}
        setRsCountry={setRsCountry}
      />


      <div ref={mainContentRef}>
        <MainContent result={result} rsCity={rsCity} rsCountry={rsCountry} />
      </div>

      <Map city={city} />
      <Footer />

    </div>
  );
}

export default Page;
