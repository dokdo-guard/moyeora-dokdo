import { useState } from "react"

const NPCBubble = (props) => {
    const [number ,setNumber] = useState(1)
    const changeNumber =() => {
        setNumber(Math.floor(Math.random() * 6 + 1))
    }
    let penguinSrc = '/assets/images/npc/penguin' + number + '.png'
    let 강치Src = '/assets/images/npc/강치' + number + '.png'
    let turtleSrc = '/assets/images/npc/turtle' + number + '.png'
    let dogSrc = '/assets/images/npc/Dog' + number + '.png'
    let 독도새우Src = '/assets/images/npc/독도새우' + number + '.png'
    let 바위게Src = '/assets/images/npc/바다게' + number + '.png'
    let dolphinSrc = '/assets/images/npc/dolphin' + number + '.png'
    let flamingoSrc = '/assets/images/npc/flamingo' + number + '.png'
    let pigeonSrc = '/assets/images/npc/pigeon' + number + '.png'
    let seagullSrc = '/assets/images/npc/seagull' + number + '.png'

    return (
    <>
        <div id='penguin' className="npcSpeaking">
            <img src={penguinSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='강치' className="npcSpeaking">
            <img src={강치Src} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='turtle' className="npcSpeaking">
            <img src={turtleSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='dog' className="npcSpeaking">
            <img src={dogSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='독도새우' className="npcSpeaking">
            <img src={독도새우Src} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='dolphin' className="npcSpeaking">
            <img src={dolphinSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='바위게' className="npcSpeaking">
            <img src={바위게Src} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='flamingo' className="npcSpeaking">
            <img src={flamingoSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='pigeon' className="npcSpeaking">
            <img src={pigeonSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
        <div id='seagull' className="npcSpeaking">
            <img src={seagullSrc} className="npcBubble animate__animated animate__pulse"></img>
            <button onClick={()=> {props.quitNPCbubble(); changeNumber();}} className="quitNPCbubble">확인</button>
        </div>
    </>)
}

export default NPCBubble