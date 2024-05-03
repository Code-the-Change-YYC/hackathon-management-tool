import PropTypes from "prop-types";

type CountDownProps = {
  name: string;
  value: number;
};

const TIMER_BACKGROUND =
  " bg-[#A689FF] text-white py-10 px-4 rounded-lg md:w-[8rem] md:h-[11rem] lg:w-[10rem] lg:h-[11rem] relative ";

const NUMBER_STYLES =
  "flex flex-col justify-center items-center font-bold text-[20px] md:text-[58px] lg:text-[60px]";
const LABEL_STYLES =
  " flex flex-col justify-center items-center uppercase text-1xl";
const HORIZONTAL_LINE =
  "absolute left-0 right-0 top-[50%] -translate-y-1/2 transform border-b-2 border-white opacity-95";

const CountdownTimer: React.FC<CountDownProps> = ({ name, value }) => {
  return (
    <div className={TIMER_BACKGROUND}>
      <div className={NUMBER_STYLES}>{value}</div>
      <div className={LABEL_STYLES}>{name}</div>
      <div className={HORIZONTAL_LINE}></div>
    </div>
  );
};

// Add prop type validation
CountdownTimer.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CountdownTimer;