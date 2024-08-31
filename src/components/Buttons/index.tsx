import { BsFillFastForwardFill, BsFillRewindFill } from 'react-icons/bs';
import { FaPause, FaPlay, FaTrashAlt } from 'react-icons/fa';

export const PlayPauseButton = ({
  isPaused,
  handleClick,
}: {
  isPaused: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      className=" min-w-10 h-10 bg-white drop-shadow rounded-full grid place-items-center text-primary hover:shadow-lg hover:bg-primary hover:text-white"
      title="Pause recording"
      onClick={handleClick}
    >
      {isPaused ? <FaPlay /> : <FaPause />}
    </button>
  );
};

export const DeleteButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      className="w-10 h-10 bg-white drop-shadow rounded-full grid place-items-center text-red-400 hover:text-red-700"
      title="Cancel recording"
      onClick={handleClick}
    >
      <FaTrashAlt className="w-5 h-5" />
    </button>
  );
};

export const SeekButton = ({
  isBack,
  handleClick,
}: {
  isBack?: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      className=" min-w-10 h-10 bg-white drop-shadow rounded-full grid place-items-center text-secondary hover:shadow-lg hover:bg-secondary hover:text-white"
      title="Pause recording"
      onClick={handleClick}
    >
      {isBack ? (
        <BsFillRewindFill size={20} />
      ) : (
        <BsFillFastForwardFill size={20} />
      )}
    </button>
  );
};

export const PlaybackButton = ({
  value,
  handleClick,
}: {
  value: number;
  handleClick: () => void;
}) => {
  return (
    <button
      className=" min-w-10 h-10 bg-primary drop-shadow rounded-full grid place-items-center text-white hover:shadow-lg hover:bg-white hover:text-primary"
      title="Pause recording"
      onClick={handleClick}
    >
      {value}x
    </button>
  );
};
