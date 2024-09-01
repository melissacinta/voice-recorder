import { formatMinutes, formatSeconds } from '@/utils/functions';
import { useCallback, useEffect, useRef, useState } from 'react';

const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | undefined>();
  const playAnimationRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLInputElement>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [timeProgress, setTimeProgress] = useState<number | null>(null);
  const [playbackspeed, setSpeed] = useState<number>(1);

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      let currentTime = audioRef.current.currentTime;
      if (currentTime >= duration) {
        currentTime = 0;
        setIsEnded(true);
        setIsPlaying(false);
      } else {
        setIsEnded(false);
      }
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    if (
      audioRef.current &&
      progressBarRef.current &&
      duration &&
      playAnimationRef
    ) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      if (!isEnded) {
        audioRef.current?.pause();
      }
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef, isEnded]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (audioRef.current) {
      if (
        seconds === undefined ||
        seconds === Infinity ||
        isNaN(Number(seconds))
      ) {
        audioRef.current.currentTime = 1e101;

        audioRef.current.addEventListener('timeupdate', getDuration);
      }
    }
  };
  function getDuration(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    audioElement.currentTime = 0;
    audioElement.removeEventListener('timeupdate', getDuration);
    setDuration(audioElement.duration);
    if (progressBarRef.current) {
      progressBarRef.current.max = audioElement.duration.toString();
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      updateProgress();
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      updateProgress();
    }
  };

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current && duration) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;

      setTimeProgress(newTime);

      // if progress bar changes while audio is on pause
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(newTime / duration) * 100}%`
      );
    }
  };

  const formatTime = (time: number | undefined): string => {
    if (typeof time === 'number' && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      // Convert to string and pad with leading zeros if necessary
      const formatedMinutes = formatMinutes(minutes);
      const formattedSeconds = formatSeconds(seconds);

      return `${formatedMinutes}:${formattedSeconds}`;
    }
    return '00:00';
  };
  const handleUpdateSpeed = () => {
    if (audioRef.current) {
      if (playbackspeed >= 2) {
        audioRef.current.playbackRate = 1;
        setSpeed(1);
      } else {
        audioRef.current.playbackRate = playbackspeed + 0.5;
        setSpeed(playbackspeed + 0.5);
      }
    }
  };
  return {
    audioRef,
    onLoadedMetadata,
    playbackspeed,
    handleUpdateSpeed,
    skipBackward,
    skipForward,
    isPlaying,
    setIsPlaying,
    progressBarRef,
    handleProgressChange,
    timeProgress,
    duration,
    formatTime,
  };
};

export default useAudioPlayer;
