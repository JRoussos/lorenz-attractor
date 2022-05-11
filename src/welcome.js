import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { isMobile } from 'react-device-detect'

const Welcome = ({ setEnter }) => {
    const texts = [
        "In chaos theory, the butterfly effect is the sensitive dependence on initial conditions in which a small change in one state of a deterministic nonlinear system can result in large differences in a later state.",
        "It has been described, in poetic terms, as the notion that the flap of a butterfly's wing in Brazil can set off a cascade of atmospheric events that, weeks later, spurs the formation of a tornado in Texas.",
        "Press any key to pause the rotation. Double click to fullscreen.",
        "Touch and hold to pause the rotation. Double tap to fullscreen."
    ]

    const handleClick = () => {
        gsap.to('.table', {duration: 1, ease: 'sine.inOut', opacity: 0, onComplete: () => setEnter(true)})
    }

    useEffect(() => {
        gsap.to('p span', { duration: 0.5, delay: 0.4, opacity: 1, y: 0, ease: 'sine.inOut', stagger: 0.03, onComplete: () => {
            gsap.to('.sec-table', { duration: 2.0, opacity: 0.7, ease: "sine.out", delay: 0.6, stagger: 0.1 })
        }})
    }, [])

    return (
        <div className='welcome'>
            <div className='table'>
                <p className='first-table'>{texts[0].split(" ").map(char => <span key={Math.random()}>{char + '\u00A0'}</span>)}</p>
                <p className='first-table'>{texts[1].split(" ").map(char => <span key={Math.random()}>{char + '\u00A0'}</span>)}</p>
            </div>
            <div className='table'>
                <p className='sec-table'>{isMobile ? texts[3]: texts[2]}</p>
                <button className='sec-table' onClick={handleClick}>enter</button>
            </div>
        </div>  
    )
}

export default Welcome