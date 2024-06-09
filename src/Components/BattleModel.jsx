//eslint-disable-next-line
const BattleModel = ({ model }) => {
  return (
    <div className="absolute -top-4 left-5 w-fit h-fit px-4 border-lime-500 border-2 rounded-lg bg-gray-900">
      <h3 className="text-white">{model}</h3>
    </div>
  );
};

export default BattleModel;
