import formatText from '../FormatText';
//eslint-disable-next-line
const BattleBox = ({ model, id }) => {
  return (
    <div className="h-full overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-lime-500">
      <div key={id} className="mr-3 animate-fadeIn text-white">
        {typeof model === 'string'
          ? formatText(model)
          : 'Error fetching the content'}
      </div>
    </div>
  );
};

export default BattleBox;
