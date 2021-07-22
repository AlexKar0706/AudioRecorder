import { useState, useCallback, useEffect, useRef } from "react";

const Audio = ({ src }) => 
{
    const audioContext = useRef(null);
    const audioElement = useRef(null);
    const gainNode = useRef(null);
    const [gainNodeValue, setGainNodeValue] = useState(1);
    const biquadFilter = useRef(null);
    const track = useRef(null);

    const setupAudioContext = useCallback(() => 
    {
        audioContext.current = new AudioContext();
        gainNode.current = audioContext.current.createGain();
        biquadFilter.current = audioContext.current.createBiquadFilter();
        track.current = audioContext.current.createMediaElementSource(audioElement.current);

        track.current.connect(gainNode.current)
        .connect(biquadFilter.current)
        .connect(audioContext.current.destination);
    })

    useEffect(() => 
    {
        if (!audioContext.current) 
        {
            setupAudioContext();
        }
    }, [setupAudioContext])

    function handleChange (e) 
    {
        setGainNodeValue(e.currentTarget.value);
        gainNode.current.gain.value = gainNodeValue;
    }

    return (
        <div>
            <audio ref={audioElement} src={src} controls={true} autoPlay={false}></audio>
            <input 
                type='range'
                name='gainNode'
                min={0}
                max={2}
                value={gainNodeValue}
                step={0.01}
                onChange={handleChange}
            />
            {/* <input 
                type='range'
                name='biquadFilter'
            /> */}
        </div>
    )
}

export default Audio