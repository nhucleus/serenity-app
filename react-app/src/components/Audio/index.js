import Relaxing from "./relaxing.mp3"


const AudioPlayer = () => {
  return (
    <div className="audio-container">
      <div className="audio-player">
        <audio src={Relaxing} controls autoPlay={true} loop />
      </div>
    </div>
  )
}

export default AudioPlayer;