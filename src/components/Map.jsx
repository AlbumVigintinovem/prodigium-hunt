import React from 'react'
import { useSiteContext } from '../context/SiteContext';

const Map = () => {

    const { toggleMap, setToggleMap, toggleBattle, setToggleBattle, monsterLevel, setMonsterLevel } = useSiteContext();

    const startBattleHandler = (x) => {
        setToggleBattle(current => !current);
        setToggleMap(current => !current);
        setMonsterLevel(x)
    }

    return (
        <>
            <div className='c-pointer' onClick={() => setToggleMap(current => !current)} > 👈 </div>
            <div className='row' >
                <h2>Map</h2>
            </div>
            <div className='row' style={{ width: "500px" }}>
                <div className='col'>
                    {/* 1 - 15 level */}
                    <p className='c-pointer' onClick={() => startBattleHandler(15)} >Town</p>
                    <p className='c-pointer' > 1 - 15 level </p>
                </div>
                <div className='col' >
                    {/* 15 - 30 level */}
                    <p className='c-pointer' onClick={() => startBattleHandler(30)}>Forest</p>
                    <p > 15 - 30 level</p>
                </div>
                <div className='col' >
                    {/* 30 - 60 level */}
                    <p className='c-pointer ' onClick={() => startBattleHandler(60)}>Cave</p>
                    <p>30 - 60 level</p>
                </div>
                <div className='col' >
                    {/* 60 - 100 level */}
                    <p className='c-pointer' onClick={() => startBattleHandler(100)}>Dark Forest</p>
                    <p >60 - 100 level</p>
                </div>
            </div>
        </>
    )
}

export default Map