import { FaExclamationCircle, FaTrashAlt } from 'react-icons/fa';
import { RecordingsListProps } from '@/types/recorder';
import useRecordingsList from '@/hooks/useRecordingsList';

export default function RecordingsList({ audio }: RecordingsListProps) {
  const { recordings, deleteAudio } = useRecordingsList(audio);

  return recordings.length > 0 ? (
    <div className="px-4 space-y-4 mt-auto pb-10">
      {recordings.map((record) => (
        <div className="record" key={record.key}>
          <audio controls src={record.audio} />
          <div className="delete-button-container">
            <button
              className="delete-button"
              title="Delete this audio"
              onClick={() => deleteAudio(record.key)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
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
