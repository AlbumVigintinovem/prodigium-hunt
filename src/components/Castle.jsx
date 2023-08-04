import React, { useEffect, useState } from 'react'
import CreateCharacter from './CreateCharacter';
import { useSiteContext } from '../context/SiteContext';
import { ref, set, onValue, remove, update, query, orderByChild, equalTo } from "firebase/database";
import { database } from '../firebase';
import Map from './Map';
import Battle from './Battle';


const Castle = () => {

    const { toggleCreateChar, setToggleCreateChar, toggleMap, setToggleMap, currentChar, setCurrentChar, toggleBattle, setToggleBattle } = useSiteContext();

    const [userData, setUserData] = useState();
    const [userChars, setUserChars] = useState();
    const [selectedChar, setSelectedChar] = useState();


    const selectCharHandler = (x) => {
        const filteredChar = query(ref(database, "users/" + localStorage.getItem("userId") + "/chars"), orderByChild("id"), equalTo(x));
        onValue(filteredChar, (snapshot) => {
            let data_ = snapshot.val();
            console.log(data_)
            let _data_ = Object.keys(data_).map(key => {
                return data_[key];
            })
            setSelectedChar(_data_);
        })
        setToggleMap(current => !current)
        console.log(selectedChar)
    }

    useEffect(() => {
        if (localStorage.getItem("userId") != null) {
            const filteredUser = query(ref(database, "users"), orderByChild("id"), equalTo(localStorage.getItem("userId")));
            onValue(filteredUser, (snapshot) => {
                let data_ = snapshot.val();
                let _data_ = Object.keys(data_).map(key => {
                    return data_[key];
                })
                setUserData(_data_);
                if (_data_[0].chars) {
                    let chars = Object.keys(_data_[0].chars).map(key => {
                        return _data_[0].chars[key];
                    })
                    setUserChars(chars);
                }
            });
        }
    }, []);

    return (
        <>
            {!toggleCreateChar && !toggleMap && !toggleBattle &&
                < div className='container d-flex align-items-start justify-content-center' style={{ minHeight: "100vh" }}>
                    <div className='text-center'>
                        <div className='empty-space' style={{ height: "200px" }} ></div>
                        <div className='row'>
                            <h2>Welcome to Castle</h2>
                        </div>
                        <div className='row'>
                            <p>Please select a character or create the new one.</p>
                        </div>
                        <div className='row gap-5' >
                            {userChars?.map((chars, index) =>

                                <div className='col border c-pointer' onClick={() => selectCharHandler(chars.id)} > {chars.charName} </div>)}
                            <div className="col border c-pointer" onClick={() => setToggleCreateChar(current => !current)} >+</div>
                        </div>
                    </div>
                </div >}
            {
                toggleCreateChar &&
                <CreateCharacter />
            }
            {
                toggleMap &&
                <>
                    <div className='container d-flex align-items-start justify-content-center' style={{ minHeight: "100vh" }}>
                        <div className='text-center'>
                            <div className='empty-space' style={{ height: "100px" }} ></div>
                            <div className='char-infos border p-3'>
                                <h4> {selectedChar && selectedChar[0].charName} | LvL{selectedChar && selectedChar[0].lvl} </h4>
                                <h4> HP:  {selectedChar && selectedChar[0].currentHP} / {selectedChar && selectedChar[0].HP} </h4>
                                <h4> Mana:  {selectedChar && selectedChar[0].currentMana} / {selectedChar && selectedChar[0].Mana} </h4>
                                <h4> EXP:  {selectedChar && selectedChar[0].currentExp} / {selectedChar && selectedChar[0].lvlExp} </h4>
                            </div>
                            <Map />
                        </div>
                    </div>
                </>
            }
            {toggleBattle &&
                <>
                    <div className='container d-flex align-items-start justify-content-center' style={{ minHeight: "100vh" }}>
                        <div className='text-center'>
                            <div className='empty-space' style={{ height: "100px" }} ></div>
                            <div className='char-infos border p-3'>
                                <h4> {selectedChar && selectedChar[0].charName} | LvL{selectedChar && selectedChar[0].lvl} </h4>
                                <h4> HP:  {selectedChar && selectedChar[0].currentHP} / {selectedChar && selectedChar[0].HP} </h4>
                                <h4> Mana:  {selectedChar && selectedChar[0].currentMana} / {selectedChar && selectedChar[0].Mana} </h4>
                                <h4> EXP:  {selectedChar && selectedChar[0].currentExp} / {selectedChar && selectedChar[0].lvlExp} </h4>
                            </div>
                            <Battle />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Castle