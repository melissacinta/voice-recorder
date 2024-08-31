import { useState, useEffect, useRef } from 'react';
import { Audio } from '../types/recorder';
import generateKey from '../utils/functions';
import { deleteAudio } from '../handlers/recordingsList';

export default function useRecordingsList(audio: string | null) {
  const [recordings, setRecordings] = useState<Audio[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (audio)
      setRecordings((prevState: Audio[]) => {
        return [...prevState, { key: generateKey(), audio }];
      });
  }, [audio]);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  }, [recordings]);

  return {
    recordings,
    divRef,
    deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
  };
}
