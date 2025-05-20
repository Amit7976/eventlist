"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const sampleEvents = [
    {
        title: 'Coffee Meetup Jaipur',
        url: 'https://www.eventbrite.com/e/coffee-meetup-jaipur-tickets-1249281698189?aff=ebdssbdestsearch',
        image:
            'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F960751353%2F2235598435203%2F1%2Foriginal.20250214-121803?h=200&w=512&auto=format%2Ccompress&q=75&sharp=10&s=4aa80483668346eda00ffc641b56e3e9',
        date: 'Sat, Jun 7, 7:00 PM + 3 more',
        location: 'Stepout Cafe',
    },
    {
        title: 'Tech Talk Delhi',
        url: 'https://www.eventbrite.com/e/tech-talk-delhi-tickets-1249281698190',
        image:
            'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1030597043%2F2754305045531%2F1%2Foriginal.20250514-120458?h=200&w=318&auto=format%2Ccompress&q=75&sharp=10&s=b6cf45bebe193b030d2497fe8759b5cf',
        date: 'Sun, Jun 8, 5:00 PM',
        location: 'Tech Hub Center',
    },
    {
        title: 'Startup Meetup Mumbai',
        url: 'https://www.eventbrite.com/e/startup-meetup-mumbai-tickets-1249281698191',
        image:
            'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F916772013%2F313035400695%2F1%2Foriginal.20241213-030129?crop=focalpoint&fit=crop&h=200&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=c2003e89b6ada368ef95759579d309fb',
        date: 'Fri, Jun 14, 6:00 PM',
        location: 'WeWork BKC',
    },
    {
        title: 'Startup Meetup Mumbai',
        url: 'https://www.eventbrite.com/e/startup-meetup-mumbai-tickets-1249281698191',
        image:
            'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F916772013%2F313035400695%2F1%2Foriginal.20241213-030129?crop=focalpoint&fit=crop&h=200&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=c2003e89b6ada368ef95759579d309fb',
        date: 'Fri, Jun 14, 6:00 PM',
        location: 'WeWork BKC',
    },
    {
        title: 'Design Conf Bengaluru',
        url: 'https://www.eventbrite.com/e/design-conf-bengaluru-tickets-1249281698192',
        image:
            'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1030597043%2F2754305045531%2F1%2Foriginal.20250514-120458?h=200&w=318&auto=format%2Ccompress&q=75&sharp=10&s=b6cf45bebe193b030d2497fe8759b5cf',
        date: 'Mon, Jun 23, 10:00 AM',
        location: 'NIMHANS Convention Center',
    },
];

function Banner({ result }: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showOverlayIndex, setShowOverlayIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlayIndex(activeIndex);
        }, 200);

        return () => clearTimeout(timer);
    }, [activeIndex]);

    return (
        <>
            <div className='max-w-7xl rounded-3xl h-96 mx-auto mt-10 mb-40 flex gap-3'>
                {sampleEvents.map((event, index) => {
                    const isActive = activeIndex === index;
                    const showOverlay = showOverlayIndex === index && isActive;

                    return (
                        <Link
                            href={event.url}
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`relative overflow-hidden h-96 rounded-2xl duration-500 ${isActive ? 'w-full' : 'w-1/2'}`}
                        >
                            <Image
                                src={event.image}
                                alt={event.title}
                                className='w-full h-full object-cover'
                                width={800}
                                height={800}
                            />

                            <div
                                className={`absolute bottom-0 bg-gradient-to-t from-black/50 to-transparent bg-opacity-50 text-white p-4 w-full h-full flex flex-col justify-end gap-2 transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0'} ${showOverlay ? 'pointer-event-auto' : 'pointer-event-none'}`}
                            >
                                <h3 className="text-3xl font-bold line-clamp-2">{event.title}</h3>
                                <p className="text-base font-semibold">{event.date}</p>
                                <p className="text-sm text-gray-300 font-semibold line-clamp-1">{event.location}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Banner;
