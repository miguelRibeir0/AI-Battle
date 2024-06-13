import formatText from './FormatText';
//eslint-disable-next-line
const BattleBox = ({ model, id }) => {
  return (
    <div className="h-full overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-lime-500">
      <div key={id} className="divr-3 animate-fadeIn text-white">
        {formatText(model)}
      </div>
    </div>
  );
};

export default BattleBox;
