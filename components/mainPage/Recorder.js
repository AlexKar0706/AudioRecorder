import { useCallback, useEffect, useRef, useState } from "react";
import Audio from './Audio'

function handleRecording(stream) 
{
    mediaRec = new MediaRecorder(stream);
    mediaRec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (mediaRec.state === 'inactive') {
            blob = new Blob(audioChunks, {type: 'audio/mpeg-3'});
        }
    }
}

const Recorder = () => 
{
    const audioStream = useRef(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const [buttonState, setButtonState] = useState('NOT PRESSED');
    const [blobUrl, setBlobUrl] = useState([]);

    const setupMedia = useCallback(async () => 
    {
        audioStream.current = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaRecorder.current = audioStream;
    });

    useEffect(() => 
    {
        if (!mediaRecorder.current) 
        {
            setupMedia();
        }
    }, [setupMedia])

    const startRecording = async () => 
    {
        if (!audioStream.current) 
        {
            await setupMedia();
        }
        if (audioStream.current) 
        {
            const isStreamEnded = audioStream.current
            .getTracks()
            .some((track) => track.readyState === "ended");
            if (isStreamEnded) 
            {
                await setupMedia();
            }

            mediaRecorder.current = new MediaRecorder(audioStream.current);
            mediaRecorder.current.ondataavailable = onRecordingActive;
            mediaRecorder.current.onstop = onRecordingStop;
            mediaRecorder.current.start();
        }
    };

    const onRecordingActive = ({ data }) => {
        audioChunks.current.push(data);
    };

    const onRecordingStop = () => {
        const blob = new Blob(audioChunks.current, {type: 'audio/mpeg-3'});
        const url = URL.createObjectURL(blob);
        const tempArr = [...blobUrl];
        tempArr.push(url);
        setBlobUrl(tempArr);
        audioChunks.current = [];
    };

    async function handleClick () 
    {
        if (buttonState === 'NOT PRESSED') 
        {
            setButtonState('PRESSED');
            if (mediaRecorder.current !== null) startRecording();
        }
        else 
        {
            if (mediaRecorder.current?.state !== 'inactive') 
            {
                mediaRecorder.current.stop();
            }
            setButtonState('NOT PRESSED');
        }
    }

    function AudioArray ({ blobUrl }) 
    {
        if (blobUrl.length === 0) return null;
        return blobUrl.map(
            (elem, index) => <Audio key={index} src={elem} />
        );
    }

    return (
        <div>
            <button onClick={handleClick}>
                {buttonState === 'NOT PRESSED' ? 'Record voice' : 'Stop recording'}
            </button>
            <AudioArray blobUrl={blobUrl} />
        </div>
    )
}

export default Recorder