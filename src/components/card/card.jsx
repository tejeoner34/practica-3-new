
import './style.css'

import React from 'react';
import { MdCheckCircleOutline } from "react-icons/md";
import { MdHighlightOff } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Draggable from 'react-draggable';
import { useState } from 'react';



function Card(props) {

    const [isDrag, setIsDrag] = useState(false);
    


    const handleClick = (e)=>{
        props.onDelete(props.task.id);
    }

    const handleStatus = (e)=>{
        props.onHandleStatus(props.task)
    }

    const handleonMouse = (e)=>{
        setIsDrag(true)
        console.log(e)
    }

    const handleStop = (e)=>{
     setIsDrag(!isDrag)
    }

    const handleEvent = (e) => {
        if(e.clientX < (window.innerWidth/3)*2 && e.clientX > window.innerWidth/3 ){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'In Process':'');
            let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            console.log(array);
            props.funcionDragger(array);
            // props.updateData(array);
        }

        if(e.clientX > (window.innerWidth/3)*2){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'Done':'');
            let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            console.log(array);
            props.funcionDragger(array);
            // props.updateData(array);
        }

        if(e.clientX < (window.innerWidth/3)){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'To Do':'');
            let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            console.log(array);
            props.funcionDragger(array);
            // props.updateData(array);
        }

        



      }


    if (props.task.state === 'To Do' || props.task.state === 'In Process') {

        return (
            <Draggable 
            onStop={handleEvent}
            onStart={handleonMouse}

            // onStop={handleStop}
            >
            <div className={isDrag? 'cardAboluste' : 'card'}>
                <div className="card__main-info">

                    <div className='card__main-info__icon'>
                        <MdHighlightOff color='#22863a' />

                        <p className='card__title' onClick={handleStatus}>{props.task.title}</p>
                    </div>
                    <div onClick={handleClick}>
                        <MdDelete fontSize='1.5rem' ></MdDelete>
                    </div>
                </div>
                <div className="card__date-info">
                    <p>#{props.task.id} Created on {props.task.date} </p>
                </div>
            </div>
            </Draggable>
        )
    } else {

        return (

            
            <Draggable 
            onStop={handleEvent}
            onDrag={handleonMouse}

            // onStop={handleStop}
            >
            <div className={isDrag? 'cardAboluste' : 'card'}>
                <div className="card__main-info">

                    <div className='card__main-info__icon'>
                        <MdCheckCircleOutline color='#cb2431' />


                        <p className='card__title' onClick={handleStatus}>{props.task.title}</p>
                    </div>
                    <div onClick={handleClick}>
                        <MdDelete fontSize='1.5rem' ></MdDelete>
                    </div>
                </div>
                <div className="card__date-info">
                <p>#{props.task.id} Created on {props.task.date} </p>
                </div>
            </div>

            </Draggable>


        )


    }

}

export default Card;