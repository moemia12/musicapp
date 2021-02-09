// Array of Audio Clips
const audioClips = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

//Drum Machine component
function App() {

    const [volume, setVolume] = React.useState(1);
    const [recording, setRecording] = React.useState('');
    const [speed, setSpeed] = React.useState(0.5)

    const playRecording = () => {
        let index = 0;
        let recordArray = recording.split('');
        const interval = setInterval(() => {
            const audioTag = document.getElementById(recordArray[index]);
            audioTag.volume = volume;
            audioTag.currentTime = 0;
            audioTag.play();
            index++;
        }, speed * 600);
        setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1)
    }

    return (
        <div className='bg-info min-vh-100 text-white'>
            <div className='text-center'>
                <h2 style={{padding: "5rem"}}>Drum Machine</h2>
                {/*Map all audio clips to their respective buttons*/}
                {audioClips.map((clip) => (
                    <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
                ))}
                <br />
                <h4 style={{margin: "2rem"}}>Volume</h4>
                <input
                    type='range'
                    step='0.01'
                    onChange={(e) => setVolume(e.target.value)}
                    value={volume}
                    max='1'
                    min='0'
                    className='w-50'
                />
                <button onClick={playRecording} className='btn btn-success'>Play</button>
                <button onClick={() => setRecording('')} className='btn btn-danger'>Clear</button>
                <br />
                <h4 style={{margin: "2rem"}}>Speed</h4>
                <input
                    type='range'
                    step='0.01'
                    onChange={(e) => setSpeed(e.target.value)}
                    value={speed}
                    max='1.2'
                    min='0.1'
                    className='w-50'
                />
                <h3 style={{margin: "5rem"}}>{recording}</h3>
            </div>
        </div>
    );
}

function Pad({ clip, volume, setRecording }) {

    const [active, setActive] = React.useState(false);



    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const handleKeyPress = (e) => {
        if (e.keyCode == clip.keyCode) {
            playSound();
        }
    }

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 200)
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording((prev => prev + clip.keyTrigger + ""))
    }
    return (
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
            <audio className='clip' id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))