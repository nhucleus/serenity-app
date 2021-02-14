import Relaxing from "./relaxing.mp3"
import {useRef, useState, useEffect} from "react";
import { RiPlayCircleLine, RiPauseCircleLine } from "react-icons/ri";
import "./Audio.css";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef();

  const playHandler = () => {
    if (playing) {
      setPlaying(false);
      audioRef.current.pause();
    } else {
      setPlaying(true);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, [audioRef]);

  return (
    <div className="audio-container">
      <div className="audio-player">
        <audio ref={audioRef} src={Relaxing} autoPlay={true} loop />
        {playing ? <RiPauseCircleLine onClick={playHandler} className="play-button"/> : <RiPlayCircleLine onClick={playHandler} className="play-button"/>}
        
      </div>
    </div>
  )
};

export default AudioPlayer;