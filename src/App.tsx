import RecorderControls from './components/recorder-controls';
import { UseRecorder } from './types/recorder';
import useRecorder from './hooks/useRecorder';
import RecordingsList from './components/recordings-list';

export default function App() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;

  return (
    <section className="h-screen bg-[#B993D6] bg-gradient-to-r from-[#8CA6DB] to-[#B993D6]  overflow-hidden flex flex-col">
      <div className="h-[90vh] mx-auto w-full max-w-[90%] md:max-w-[600px] bg-white my-auto rounded-2xl drop-shadow-xl relative  overflow-hidden">
        <div className="h-full flex flex-col">
          <h1 className="text-4xl py-4 text-center">Audiocorder</h1>
          <div className="flex-1  max-h-[calc(100%-100px)] overflow-auto flex flex-col">
            <RecordingsList audio={audio} />
          </div>
          <RecorderControls recorderState={recorderState} handlers={handlers} />
        </div>
      </div>
    </section>
  );
}
