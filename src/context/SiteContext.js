import { createContext, useState, useSelector, useContext, useRef, useEffect } from "react";
import db from "../firebase";
import { UserAuth } from "./AuthContext";

const SiteContext = createContext()

export const useSiteContext = () => useContext(SiteContext);


const SiteProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState()
  const [charInfo, setCharInfo] = useState()
  const { user } = UserAuth();
  const [uid_, setUid_] = useState()
const [currentCharInfo, setCurrentCharInfo] = useState()

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

  useEffect(() => {

    if (JSON.parse(localStorage.getItem("userIds")) != null) {
      db.collection("player/").where("uid", "==", JSON.parse(localStorage.getItem("userIds"))?.uid).onSnapshot(snapshot => {
        return setPlayerInfo(snapshot.docs.map(doc => (
          {
            id: doc.data().uid,
            job: doc.data().job,
            email: doc.data().email,
            charLevel: doc.data().charLevel,
            charDamageMin: doc.data().charDamageMin,
            charDamageMax: doc.data().charDamageMax,
            charLevelExp: doc.data().charLevelExp,
            charLevelUpExp: doc.data().charLevelUpExp,
            charBagItem: doc.data().charBagItem,
            charHP: doc.data().charHP,
            charCurrentHP: doc.data().charCurrentHP,
            charName: doc.data().charName
          }

        )))
      })
      return;
    }
    
  }, [user]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userIds")) != null) {
      db.collection("player/").doc(JSON.parse(localStorage.getItem("userIds"))?.uid).collection("0").onSnapshot(snapshot => {
        return setCharInfo(snapshot.docs.map(doc => (
          {
            uid: doc.data().uid,
            job: doc.data().job,
            charLevel: doc.data().charLevel,
            charDamageMin: doc.data().charDamageMin,
            charDamageMax: doc.data().charDamageMax,
            charLevelExp: doc.data().charLevelExp,
            charLevelUpExp: doc.data().charLevelUpExp,
            charBagItem: doc.data().charBagItem,
            charHP: doc.data().charHP,
            charCurrentHP: doc.data().charCurrentHP,
            charName: doc.data().charName,
            currentGold: doc.data().currentGold
          }
        )))
      })
      return;
    }
  }, [user]);



  // Character Infos
  let charDamageMin = playerInfo && playerInfo[0].charDamageMin
  let charDamageMax = playerInfo && playerInfo[0].charDamageMax
  let charLevel = playerInfo && playerInfo[0].charLevel
  let charLevelUp = playerInfo && playerInfo[0].charLevelUpExp
  let charHP = playerInfo && playerInfo[0].charHP
  let charCurrentHp = playerInfo && playerInfo[0].charCurrentHP
  let charEXP = playerInfo && playerInfo[0].charLevelExp
  let charName = playerInfo && playerInfo[0].charName

  const data = {
    playerInfo,
    setPlayerInfo,
    charDamageMin,
    charDamageMax,
    charLevel,
    charLevelUp,
    charHP,
    charCurrentHp,
    charEXP,
    charName,
    charInfo,
    getRandomValue
  }

  return (
    <SiteContext.Provider value={data} >
      {children}
    </SiteContext.Provider>
  );
}


export default SiteProvider;