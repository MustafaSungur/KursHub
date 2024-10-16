import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "@radix-ui/react-slider";

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying(!playing);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [playing]);

  const handlePlayPause = () => setPlaying(!playing);
  const handleVolumeChange = (value: number[]) => setVolume(value[0]);
  const handleToggleMute = () => setMuted(!muted);
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0]);
    playerRef.current?.seekTo(value[0]);
  };
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };
  const handleDuration = (duration: number) => setDuration(duration);
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerWrapperRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div ref={playerWrapperRef} className="relative group">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="auto"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        className="react-player"
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Slider
          value={[played]}
          max={1}
          step={0.01}
          onValueChange={handleSeekChange}
          className="w-full mb-2"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:text-amber-500"
            >
              {playing ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMute}
              className="text-white hover:text-amber-500"
            >
              {muted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </Button>
            <Slider
              value={[muted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
            <span className="text-white text-sm">
              {formatTime(played * duration)} / {formatTime(duration)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFullscreen}
            className="text-white hover:text-amber-500"
          >
            {fullscreen ? (
              <Minimize className="h-6 w-6" />
            ) : (
              <Maximize className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
