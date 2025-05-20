"use client";
import Card from "@/components/Card";
import React, { useState, useEffect } from "react";

type Event = {
    title: string;
    url: string;
    image: string;
    date: string;
    location: string;
    price: string;
};

export default function MainContent({ result, city }: any) {


    return (result ? (<main className="p-10">
        <p className="text-5xl font-bold text-gray-500 -mb-10">All Event of</p>
        <h2 className="capitalize font-semibold text-red-500 text-[10vw]">{city}</h2>

        <div>
            {result.events.map((event: any, i: any) => (
                <Card event={event} key={i} />
            ))}
        </div>
    </main>) : null)

}
