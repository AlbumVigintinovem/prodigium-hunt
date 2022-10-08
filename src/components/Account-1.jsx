import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { UserAuth } from '../context/AuthContext'
import { useSiteContext } from '../context/SiteContext';
import db from '../firebase';

const Account = () => {

    const { user, logout } = UserAuth();
    const {
        playerInfo,
        charDamageMin,
        charDamageMax,
        charLevel,
        charLevelUp,
        charHP,
        charCurrentHp,
        charEXP,
        charName,
        charInfo, } = useSiteContext();

    const [currentCharInfo, setCurrentCharInfo] = useState()


    const navigate = useNavigate();

    const [uid_, setUid_] = useState()

    const handleLogout = async (e) => {

        try {
            await logout();
            navigate('/');
            toast.success('You are logged out')
        } catch (e) {
            console.log(e.message)
        }

    }
    const firstUpdate = useRef(true);
    const firstUpdate2 = useRef(true);

    const handleSelect = (name, uid) => {
        toast.success(name + " olarak giriş yaptınız")
        db.collection("player/").doc(JSON.parse(localStorage.getItem("userIds"))?.uid + "/").collection("0/").where("uid", "==", uid).onSnapshot(snapshot => {
            return setCurrentCharInfo(snapshot.docs.map(doc => (
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
        setUid_(uid)
    }

    const charLogout = () => {
        // localStorage.setItem("currentCharInfo", JSON.stringify(currentCharInfo))
        debugger;
        localStorage.setItem("currentCharInfo", undefined)
        // navigate('/')
    }


    useEffect(() => {
        console.log(currentCharInfo)
        if (localStorage.getItem("currentCharInfo") != 'undefined') {
            if (localStorage.getItem("currentCharInfo")?.length > 0) {
                debugger;
                setCurrentCharInfo(JSON.parse(localStorage.getItem("currentCharInfo")))
            }
            return;
        } else if (currentCharInfo != undefined ) {
            localStorage.setItem("currentCharInfo", JSON.stringify(currentCharInfo))
            return;
        }
    }, [uid_])

    useEffect (() => {
     if (currentCharInfo != undefined) {
        localStorage.setItem("currentCharInfo", JSON.stringify(currentCharInfo))
     }   
    })


    return (
        <>
            <Row>
                <Col>
                </Col>
                <Col lg="3">
                    {playerInfo && playerInfo[0].charName} loged in. <h2>  Character Details</h2>
                    <button onClick={handleLogout} >logout</button>

                </Col>
                {currentCharInfo ? <>
                    <Row>
                        <Col>
                            <h2>
                                Name: {currentCharInfo[0]?.charName}
                            </h2>
                        </Col>
                        <Col>
                            Current HP:  {currentCharInfo[0]?.charCurrentHP}
                        </Col>
                        <Col>
                            Max HP:  {currentCharInfo[0]?.charHP}
                        </Col>
                        <Col>
                            Max Damage:   {currentCharInfo[0]?.charDamageMax}
                        </Col>
                        <Col>
                            Min Damage:  {currentCharInfo[0]?.charDamageMin}
                        </Col>
                        <Col>
                            Char LVL:  {currentCharInfo[0]?.charLevel}
                        </Col>
                        <Col>
                            Char EXP:  {currentCharInfo[0]?.charLevelExp} / {currentCharInfo[0]?.charLevelUpExp}
                        </Col>
                    </Row>
                    <Button onClick={charLogout} > Select Character</Button>

                </> : <>
                    {charInfo && charInfo.map((player, index) => <>
                        <Row>
                            <Col>
                                <h2>
                                    Name: {player.charName}
                                </h2>
                            </Col>
                            <Col>
                                Char Slot:  {player.id}
                            </Col>
                            <Col>
                                Current HP:   {player.charCurrentHP}
                            </Col>
                            <Col>
                                Max HP:  {player.charHP}
                            </Col>
                            <Col>
                                Max Damage:   {player.charDamageMax}
                            </Col>
                            <Col>
                                Min Damage:  {player.charDamageMin}
                            </Col>
                            <Col>
                                Char LVL:  {player.charLevel}
                            </Col>
                            <Col>
                                Char EXP:  {player.charLevelExp} /  {player.charLevelUpExp}
                            </Col>
                        </Row>
                        <Button onClick={() => handleSelect(player.charName, player.uid)} >Select Character</Button>
                    </>)}</>}
            </Row>
        </>
    )
}

export default Account