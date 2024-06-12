import React from 'react';

const BattleContext = React.createContext();

//eslint-disable-next-line
const BattleId = ({ children }) => {
  const [userId, setUserId] = React.useState(null);

  return (
    <BattleContext.Provider value={{ userId, setUserId }}>
      {children}
    </BattleContext.Provider>
  );
};

export { BattleId, BattleContext };
