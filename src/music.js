import React, { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

import music from './assets/background.mp3'

const Music = () => {
    const CROSSFADE_TIME = 3

    const audio_1 = useRef(new Audio(music))
    const audio_2 = useRef(new Audio(music))
    
    const timeoutRef  = useRef()
    let audio_main = audio_1

    const getTimeLeft = useCallback((audioRef) => {
        let timeLeft = audioRef.current.duration - audioRef.current.currentTime
        return timeLeft < 1 ? timeLeft : 1
    }, [])

    const setCrossFadeTimer = (audioRef_cur, audioRef_nex) => {
        timeoutRef.current = setTimeout(() => {
            try {
                audio_main = audioRef_nex
                audio_main.current.currentTime = 0
                audio_main.current.volume = 0.8
                
                audio_main.current.play()
                setCrossFadeTimer(audioRef_nex, audioRef_cur)
            } catch (error) {
                clearTimeout(timeoutRef.current)                
            }
        }, (audioRef_cur.current.duration - CROSSFADE_TIME) * 1000)
    }

    const beforePlay = () => {
        audio_main.current.currentTime = 0
        audio_main.current.volume = 0.8

        audio_main.current.play()

        setCrossFadeTimer(audio_1, audio_2)
    }

    const beforePause = () => {
        clearTimeout(timeoutRef.current)
        gsap.to(audio_main.current, {id: 'fade_out', duration: getTimeLeft(audio_main), volume: 0, onComplete: () => {
            audio_main.current.currentTime = audio_main.current.duration
            audio_main.current.pause()
        }})
    }

    const handleAudio = () => {
        const bars = document.querySelectorAll('.audio-bar')

        if(audio_main.current.paused) {
            beforePlay()
            
            bars.forEach((element, index) => { 
                gsap.timeline({ id: `audio-animation-${index}`, repeat: -1, delay: 0.3 * index })
                    .to(element, {duration: 0.8, scaleY: 0.7})
                    .to(element, {duration: 0.8, scaleY: 0.1})
            })
        }else {
            beforePause()

            bars.forEach((element, index) => { 
                gsap.getById(`audio-animation-${index}`)?.kill()
                gsap.to(element, {duration: 0.6, scaleY: 0.1})
            })
        }
    }

    return (
        <div className="audio" onClick={handleAudio}>
            {[...new Array(4)].map((_, i) => <span key={i} className='audio-bar'></span>)}                
        </div>
    )
}

export default Music