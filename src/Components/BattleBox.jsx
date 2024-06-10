import formatText from './FormatText';
//eslint-disable-next-line
const BattleBox = ({ model, id }) => {
  return (
    <div className="h-full overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-lime-500">
      <p key={id} className="animate-fadeIn pr-3 text-white">
        {formatText(model)}
      </p>
    </div>
  );
};

export default BattleBox;
