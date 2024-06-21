import BattleModel from './BattleBox/BattleModel.jsx';

//eslint-disable-next-line
const ModelDisplay = ({ modelLabel, boxContent }) => (
  <div className="h-full w-5/12">
    <div className="relative h-full w-full rounded-lg border-2 border-lime-500 p-6">
      <BattleModel model={modelLabel} />
      {boxContent}
    </div>
  </div>
);

export default ModelDisplay;
