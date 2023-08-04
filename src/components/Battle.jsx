import React, { useEffect, useState } from 'react'
import { useSiteContext } from '../context/SiteContext';
import { toast } from 'react-hot-toast';

const Battle = () => {

    const { toggleBattle, setToggleBattle, toggleMap, setToggleMap, monsterLevel, setMonsterLevel } = useSiteContext();


    const [battleOn, setBattleOn] = useState(true);
    const [playerWin, setPlayerWin] = useState(false);
    const [playerLose, setPlayerLose] = useState(false);
    const [monsterInfo, setMonsterInfo] = useState([{
        name: "monster1", Hp: 200, currentHp: 200, MinAttack: 10, MaxAttack: 50, Speed: 0, Defence: 40, Resist: 0, exp: 10
    }, {
        name: "monster2", Hp: 250, currentHp: 250, MinAttack: 15, MaxAttack: 60, Speed: 0, Defence: 50, Resist: 0, exp: 15
    }, {
        name: "monster3", Hp: 200, currentHp: 200, MinAttack: 55, MaxAttack: 100, Speed: 0, Defence: 20, Resist: 0, exp: 35
    }]);
    const [playerInfo, setPlayerInfo] = useState({
        name: "", Hp: 200, currentHp: 100, MinAttack: 10, MaxAttack: 50, Speed: 0, Defence: 0, Resist: 0, Mana: 0, currentMana: 0
    });
    const [targetMonster, setTargetMonster] = useState({});


    const wonHandler = () => {
        setToggleBattle(current => !current);
        setToggleMap(current => !current);
    }

    const attackDamage = (x, y) => {
        const randomNumber = Math.random() * (y - x) + x;
        console.log(randomNumber);
        return randomNumber;
    }

    const playerAttack = () => {
        const attack = targetMonster.currentHp - attackDamage(playerInfo.MaxAttack, playerInfo.MinAttack);
        console.log(attack)
        setTargetMonster({ ...targetMonster, currentHp: attack })
        console.log(Math.round(attackDamage(0, 2)));


    }
    const playerSkillOne = () => {

    }
    const playerSkillTwo = () => {

    }
    const playerSkillTree = () => {

    }
    const playerSkillFour = () => {

    }

    const monsterAttack = () => {

    }

    const monsterSpecialAttack = () => {

    }

    useEffect(() => {
        if (targetMonster && targetMonster.currentHp < 0) {
            toast.success("Monster Have Been Slayed!");
            setTargetMonster(monsterInfo[Math.round(attackDamage(0, 2))])
            setBattleOn(current => !current);
            setPlayerWin(current => !current);
            {/* BU BÖLÜME KAZANDIĞI EXP CHAR DURUMU VS VERİTABANINA KAYDEDİLİP MAPE GERİ DÖNDÜRÜLECEK */ }
        }
    }, [playerAttack]);

    useEffect(() => {
        console.log(monsterLevel)
        if (monsterLevel === 15) {
            setTargetMonster(monsterInfo[Math.round(attackDamage(0, 2))]);
            console.log("1234567")
        }
        else {
            console.log("Album")
        }
        // if (monsterLevel === 30) {

        // }
        // if (monsterLevel === 60) {

        // }
        // if (monsterLevel === 100) {

        // }
    }, [playerWin])
    console.log(targetMonster)
    return (
        <div>
            {battleOn && <>
                <div className='c-pointer' onClick={() => setToggleBattle(current => !current)} > 👈 </div>
                <div className='row'> <h2>Battle</h2> </div>
                <div className="row border d-flex text-center justify-content-center c-pointer" onClick={playerAttack}> Attack </div>
                <h4> {Math.round(targetMonster && targetMonster.currentHp)} / {targetMonster && targetMonster.Hp} </h4></>}
            {playerWin && <>
                <div className='row'> <h2>Monster Have Been Slayed! You Win !</h2> </div>
                <h4> Loots: 38 gold </h4>
                <div className='c-pointer border' onClick={() => wonHandler()} >Loot the Monster & Go Back 👈 </div>
            </>}
            {playerLose && <></>}
        </div>
    )
}

export default Battle