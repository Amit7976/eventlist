"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const cities = [
    {
        title: "Sydney",
        country: "Australia",
        description: "Discover events in beautiful Sydney",
        image: "/images/cities/sydney.jpg",
    },
    {
        title: "Jaipur",
        country: "India",
        description: "Explore heritage and tech events in Jaipur",
        image: "/images/cities/jaipur.webp",
    },
    {
        title: "New York",
        country: "NY",
        description: "Attend top events in NYC",
        image: "/images/cities/newYork.jpg",
    },
    {
        title: "Mumbai",
        country: "India",
        description: "Join vibrant meetups in Mumbai",
        image: "/images/cities/mumbai.webp",
    },
    {
        title: "London",
        country: "UK",
        description: "What's happening in London?",
        image: "/images/cities/london.jpeg",
    },
];

function Banner({ setCity, setCountry, city, country, setResult, setRsCity, setRsCountry }: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showOverlayIndex, setShowOverlayIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlayIndex(activeIndex);
        }, 200);
        return () => clearTimeout(timer);
    }, [activeIndex]);


    const handleClick = async ({ newCity, newCountry }: { newCity: string; newCountry: string }) => {
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch(
                `/api/scrape?country=${encodeURIComponent(newCountry)}&city=${encodeURIComponent(newCity)}`
            );
            const json = await res.json();

            setRsCountry(newCountry);
            setRsCity(newCity);

            setResult(json);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div className="h-screen w-screen fixed top-0 z-40 bg-black/30 dark:bg-black/50 flex items-center justify-center select-none">
                    <Image src={'/images/gif/loader.gif'} width={200} height={200} alt="Loader" className="aspect-square w-20"></Image>
                </div>
            ) : null}
            <div className="max-w-7xl rounded-3xl h-96 mx-auto mt-10 mb-40 flex gap-3">
                <div className="flex gap-4 overflow-x-auto px-2 flex-nowrap lg:flex-rap overflow-y-scroll lg:overflow-y-auto">
                    {cities.map((city, index) => {

                        const isActive = activeIndex === index;
                        const showOverlay = showOverlayIndex === index && isActive;

                        return (
                            <div
                                key={index}
                                className={`relative overflow-hidden h-96 rounded-2xl duration-500 cursor-pointer shrink-0 lg:shrink ${isActive ? 'w-2/3 lg:w-full' : 'w-2/3 sm:w-1/2'}`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => {
                                    setCity(city.title);
                                    setCountry(city.country);
                                    handleClick({ newCity: city.title, newCountry: city.country })
                                }}
                            >
                                <Image
                                    src={city.image}
                                    alt={city.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className={`absolute bottom-0 bg-gradient-to-t from-black /50 to-transparent bg-opacity-50 text-white p-4 w-full h-full flex flex-col justify-end gap-2 transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-100 lg:opacity-0'} ${showOverlay ? 'pointer-event-auto' : 'pointer-event-auto lg:pointer-event-none'}`}>
                                    <h3 className="text-3xl font-semibold">{city.title}</h3>
                                    <p className="text-base text-gray-300 font-normal line-clamp-2">
                                        {city.description}
                                    </p>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div >
        </>
    );
}

export default Banner;



