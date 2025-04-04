import React, { useRef, useState } from 'react';
import { Button, Slider } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

interface AudioPlayerProps {
  audioUrl: string;
  onPlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        onPlay();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Button
        type="text"
        icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        onClick={handlePlay}
        style={{ fontSize: '24px' }}
      />
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default AudioPlayer; 