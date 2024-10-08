import { FaExclamationCircle } from 'react-icons/fa';
import useRecordingsList from '@/hooks/useRecordingsList';
import { RecordingsListProps } from '@/types/recorder';
import { AudioPlayer } from '../audio-player';
import { RefObject } from 'react';

export default function RecordingsList({ audio }: RecordingsListProps) {
  const { recordings, deleteAudio, divRef } = useRecordingsList(audio);

  return recordings.length > 0 ? (
    <div className="px-4 space-y-4 mt-auto pb-4">
      {recordings.map((record) => (
        <div key={record.key}>
          <AudioPlayer
            audio={record.audio}
            deleteAudio={() => deleteAudio(record.key)}
          />
        </div>
      ))}
      <div ref={divRef as RefObject<HTMLDivElement>} />
    </div>
  ) : (
    <div className="h-full grid place-items-center">
      <div className="text-center">
        <div>
          <FaExclamationCircle color="#f2ea02" className="w-40 h-40 mx-auto" />
        </div>
        <span>You don't have records</span>
      </div>
    </div>
  );
}
