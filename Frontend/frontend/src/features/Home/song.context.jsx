import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/zeelpatel6106/cohort-2/moodify/songs/Millionaire_PagalWorld.com.sb__vRe0LQ5PC.mp3?updatedAt=1773422424566",
        "posterUrl": "https://ik.imagekit.io/zeelpatel6106/cohort-2/moodify/posters/Millionaire_PagalWorld.com.sb__NL3q9k8W9.jpeg?updatedAt=1773422423667",
        "title": "Millionaire(PagalWorld.com.sb)",
        "mood": "happy"
    })
    const [loading, setLoading] = useState(false)
    return (
        <SongContext.Provider value={{ loading, setLoading, song, setSong }}>{children}</SongContext.Provider>
    )
}