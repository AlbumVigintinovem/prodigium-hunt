import { createContext, useState, useSelector, useContext, useRef, useEffect } from "react";
import db from "../firebase";

const SiteContext = createContext()

export const useSiteContext = () => useContext(SiteContext);


const SiteProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState()
  const [charInfo, setCharInfo] = useState()
  const [uid_, setUid_] = useState()
  const [currentCharInfo, setCurrentCharInfo] = useState()
  const [toggleCreateChar, setToggleCreateChar] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const [toggleBattle, setToggleBattle] = useState(false);
  const [monsterLevel, setMonsterLevel] = useState();
  const [currentChar, setCurrentChar] = useState({
    name: "", lvl: 0, HP: 0, currentHP: 0, MaxAttack: 0, MinAttack: 0, Defence: 0, Resist: 0, Speed: 0, Mana: 0, currentMana: 0
  })


  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


  // Character Infos

  const data = {
    getRandomValue, toggleCreateChar, setToggleCreateChar, toggleMap, setToggleMap, currentChar, setCurrentChar, toggleBattle, setToggleBattle, monsterLevel, setMonsterLevel
  }

  return (
    <SiteContext.Provider value={data} >
      {children}
    </SiteContext.Provider>
  );
}


export default SiteProvider;