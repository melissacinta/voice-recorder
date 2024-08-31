import useAudioPlayer from '@/hooks/useAudioPlayer';
import { RefObject } from 'react';
import {
  DeleteButton,
  PlayPauseButton,
  PlaybackButton,
  SeekButton,
} from '../Buttons';

export const AudioPlayer = ({
  audio,
  deleteAudio,
}: {
  audio: string;
  deleteAudio: () => void;
}) => {
  const {
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
  } = useAudioPlayer();

  return (
    <div className="flex gap-4 items-center py-3 shadow rounded-lg px-3 flex-col border border-primary/20 md:max-w-[80%] ml-auto">
      <audio
        src={audio}
        ref={audioRef as RefObject<HTMLAudioElement>}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className="flex justify-between gap-2 items-center w-full">
        <PlaybackButton value={playbackspeed} handleClick={handleUpdateSpeed} />
        <div className="flex items-center md:gap-2">
          <SeekButton handleClick={skipBackward} isBack={true} />
          <PlayPauseButton
            isPaused={!isPlaying}
            handleClick={() => setIsPlaying((prev) => !prev)}
          />
          <SeekButton handleClick={skipForward} />
        </div>
        <DeleteButton handleClick={deleteAudio} />
      </div>
      <div className="flex items-center justify-center gap-4 w-full flex-1">
        <input
          className="w-full bg-gray-300"
          ref={progressBarRef as RefObject<HTMLInputElement>}
          type="range"
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="text-xs whitespace-nowrap">
          {timeProgress && formatTime(timeProgress)} /{' '}
          {duration && formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
