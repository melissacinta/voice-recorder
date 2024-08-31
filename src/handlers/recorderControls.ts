import { Recorder, SetRecorder } from '../types/recorder';

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function saveRecording(recorder: MediaRecorder) {
  if (recorder.state !== 'inactive') recorder.stop();
}

export function pauseRecording(
  recorder: MediaRecorder,
  setRecorderState: SetRecorder
) {
  if (recorder.state === 'recording') {
    recorder.pause();

    setRecorderState((prevState) => {
      return {
        ...prevState,
        isPaused: true,
      };
    });
  }
}

export function resumeRecording(
  recorder: Recorder,
  setRecorderState: SetRecorder
) {
  if (recorder.isPaused && recorder.mediaRecorder) {
    recorder.mediaRecorder.resume();

    setRecorderState((prevState) => {
      return {
        ...prevState,
        isPaused: false,
      };
    });
  }
}
