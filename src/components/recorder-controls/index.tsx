import { FaMicrophone, FaPlus } from 'react-icons/fa';
import { RecorderControlsProps } from '@/types/recorder';
import { formatMinutes, formatSeconds } from '@/utils/functions';
import { LuSend } from 'react-icons/lu';
import { DeleteButton, PlayPauseButton } from '../Buttons';

export default function RecorderControls({
  recorderState,
  handlers,
}: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording, isPaused } =
    recorderState;
  const {
    startRecording,
    saveRecording,
    cancelRecording,
    pauseRecording,
    resumeRecording,
  } = handlers;

  return (
    <div className="flex min-h-16 shadow-[rgba(9,30,66,0.5)_0px_4px_8px_4px] justify-between items-center px-4 py-3">
      <div className="flex items-center gap-2">
        {initRecording ? (
          <div className="">
            <DeleteButton handleClick={cancelRecording} />
          </div>
        ) : (
          <FaPlus className="w-5 h-5" />
        )}
        {initRecording && (
          <div className="">
            <span className="relative h-3 w-3 inline-flex mx-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            <span>{formatMinutes(recordingMinutes)}</span>
            <span>:</span>
            <span>{formatSeconds(recordingSeconds)}</span>
            <span className="ml-2">{isPaused ? 'paused' : 'recording'}</span>
          </div>
        )}
      </div>
      <div className=" flex items-center gap-2">
        {initRecording && (
          <PlayPauseButton
            isPaused={isPaused}
            handleClick={() =>
              isPaused ? resumeRecording() : pauseRecording()
            }
          />
        )}

        <button
          className=" w-10 h-10 bg-primary shadow-xl hover:shadow hover:bg-white hover:text-primary rounded-full grid place-items-center text-white"
          title={initRecording ? 'Save recording' : 'Start recording'}
          onClick={() => (initRecording ? saveRecording() : startRecording())}
          disabled={initRecording && recordingSeconds === 0}
        >
          {initRecording ? (
            <LuSend className="w-5 h-5" />
          ) : (
            <FaMicrophone className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
