import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import { ref, set, onValue, remove, update, query, orderByChild, equalTo } from "firebase/database";
import { database } from '../firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';



const CreateCharacter = () => {
    const { toggleCreateChar, setToggleCreateChar } = useSiteContext();

    const [i_charName, setI_charName] = useState();
    const [charInfo, setCharInfo] = useState({
        name: "", HP: 0, MaxAttack: 0, MinAttack: 0, Mana: 0, Speed: 0, Defence: 0, Resist: 0, lvl: 0
    })
    const navigate = useNavigate();


    const newCharInfos = [
        { name: "Mage", HP: 100, MinAttack: 40, MaxAttack: 100, Mana: 200, Speed: 100, Defence: 50, Resist: 75 },
        { name: "Warrior", HP: 200, MinAttack: 60, MaxAttack: 80, Mana: 150, Speed: 80, Defence: 85, Resist: 70 },
        { name: "Paladin", HP: 100, MinAttack: 60, MaxAttack: 75, Mana: 180, Speed: 100, Defence: 100, Resist: 80 },
        { name: "Assasin", HP: 100, MinAttack: 30, MaxAttack: 120, Mana: 150, Speed: 150, Defence: 50, Resist: 50 }
    ]

    const createCharHandler = () => {
        const filteredUser = query(ref(database, "users"), orderByChild("username"), equalTo(i_charName));
        onValue(filteredUser, (snapshot) => {
            let data_ = snapshot.val();
            if (data_ === null) {
                const createId = nanoid();
                set(ref(database, 'users/' + localStorage.getItem("userId") + "/chars/" + createId), { id: createId, charName: i_charName, class: charInfo.name, HP: charInfo.HP, MinAttack: charInfo.MinAttack, MaxAttack: charInfo.MaxAttack, Mana: charInfo.Mana, Speed: charInfo.Speed, Defence: charInfo.Defence, Resist: charInfo.Resist });
                setI_charName("");
                toast.success("Character created!");
                setToggleCreateChar(current => !current);

            } else {
                toast.error("Character name is already used")
            }
        })

    }

    const selectCharHandler = (x) => {
        if (x === 0) {
            setCharInfo({ ...charInfo, name: newCharInfos[0].name, HP: newCharInfos[0].HP, MaxAttack: newCharInfos[0].MaxAttack, MinAttack: newCharInfos[0].MinAttack, Mana: newCharInfos[0].Mana, Speed: newCharInfos[0].Speed, Defence: newCharInfos[0].Defence, Resist: newCharInfos[0].Resist });
            document.getElementById("select-mage").style.transform = "scale(1.1)"
            document.getElementById("select-paladin").style.transform = "scale(1)"
            document.getElementById("select-warrior").style.transform = "scale(1)"
            document.getElementById("select-assasin").style.transform = "scale(1)"
        } else if (x === 1) {
            setCharInfo({ ...charInfo, name: newCharInfos[1].name, HP: newCharInfos[1].HP, MaxAttack: newCharInfos[1].MaxAttack, MinAttack: newCharInfos[1].MinAttack, Mana: newCharInfos[1].Mana, Speed: newCharInfos[1].Speed, Defence: newCharInfos[1].Defence, Resist: newCharInfos[1].Resist });
            document.getElementById("select-mage").style.transform = "scale(1)"
            document.getElementById("select-paladin").style.transform = "scale(1)"
            document.getElementById("select-warrior").style.transform = "scale(1.1)"
            document.getElementById("select-assasin").style.transform = "scale(1)"
        } else if (x === 2) {
            setCharInfo({ ...charInfo, name: newCharInfos[2].name, HP: newCharInfos[2].HP, MaxAttack: newCharInfos[2].MaxAttack, MinAttack: newCharInfos[2].MinAttack, Mana: newCharInfos[2].Mana, Speed: newCharInfos[2].Speed, Defence: newCharInfos[2].Defence, Resist: newCharInfos[2].Resist });
            document.getElementById("select-mage").style.transform = "scale(1)"
            document.getElementById("select-paladin").style.transform = "scale(1.1)"
            document.getElementById("select-warrior").style.transform = "scale(1)"
            document.getElementById("select-assasin").style.transform = "scale(1)"
        } else if (x === 3) {
            setCharInfo({ ...charInfo, name: newCharInfos[3].name, HP: newCharInfos[3].HP, MaxAttack: newCharInfos[3].MaxAttack, MinAttack: newCharInfos[3].MinAttack, Mana: newCharInfos[3].Mana, Speed: newCharInfos[3].Speed, Defence: newCharInfos[3].Defence, Resist: newCharInfos[3].Resist });
            document.getElementById("select-mage").style.transform = "scale(1)"
            document.getElementById("select-paladin").style.transform = "scale(1)"
            document.getElementById("select-warrior").style.transform = "scale(1)"
            document.getElementById("select-assasin").style.transform = "scale(1.1)"
        }
    }
    return (
        <>
            <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='text-center'>
                    <div className='c-pointer' onClick={() => setToggleCreateChar(current => !current)} > 👈 </div>
                    <div className='row'>
                        <h2>Create a new character</h2>
                    </div>
                    <div className='row gap-5'>
                        {newCharInfos.map((info, index) => <>
                            <div id={"select-" + info.name.toLowerCase()} className='col border c-pointer' onClick={() => selectCharHandler(index)} >
                                <p className='border'> {info.name} </p>
                                <table style={{ textAlign: "left", margin: "10px", width: "150px" }} >
                                    <tr>
                                        <th>HP:</th>
                                        <td>{info.HP}</td>
                                    </tr>
                                    <tr>
                                        <th>Attack:</th>
                                        <td>{info.MinAttack} - {info.MaxAttack} </td>
                                    </tr>
                                    <tr>
                                        <th>Mana:</th>
                                        <td>{info.Mana}</td>
                                    </tr>
                                    <tr>
                                        <th>Speed:</th>
                                        <td>{info.Speed}</td>
                                    </tr>
                                    <tr>
                                        <th>Defence:</th>
                                        <td>{info.Defence}</td>
                                    </tr>
                                    <tr>
                                        <th>Resist:</th>
                                        <td>{info.Resist}</td>
                                    </tr>
                                </table>
                            </div>
                        </>)}
                    </div>
                    <div className='row mt-3'>
                        <div className="inputContainer">
                            <div className="inputBox">
                                <input type="text" required value={i_charName} onChange={(e) => setI_charName(e.target.value)} />
                                <span>Character Name</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center' >
                            <button className="btn btn-primary py-3 w-50 mt-3" onClick={createCharHandler} >Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCharacter