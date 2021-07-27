import React from "react"
import background from '../assets/background.jpg'
import firBackgroundPicture from "../assets/firBackgroundPicture.jpg"

export default function Home() {
    return (
        <main>
            <img src={firBackgroundPicture} alt="Water Droplets on Fir" className="absolute object-cover w-full h-full"/>
            <section class="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
                <h1 className="text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">Hello there!</h1>
            </section>
        </main>
    )
}