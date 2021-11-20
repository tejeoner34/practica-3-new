
import './style.css'

import React from 'react';
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Draggable from 'react-draggable'; 
import { useState } from 'react';



function Card(props) {

    const [isDrag, setIsDrag] = useState(false);

    const nodeRef = React.useRef(null);

    const handleClick = (e)=>{
        props.onDelete(props.task.id);
    }

    const handleStatus = (e)=>{
        props.onHandleStatus(props.task)
    }

    const handleonMouse = (e)=>{
        setIsDrag(!isDrag);
        props.isDragging(false);
        
    }

    const handleEvent = (e) => {
        if(e.clientX < (window.innerWidth/3)*2 && e.clientX > window.innerWidth/3 ){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'In Process':'');
            // let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            window.location.reload();

            // props.funcionDragger(array);
            // props.updateData(array);
        }else if(e.clientX > (window.innerWidth/3)*2){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'Done':'');
            // let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            window.location.reload();

            // props.funcionDragger(array);
            // props.updateData(array);
        }else if(e.clientX < (window.innerWidth/3)){
            const localData = JSON.parse(localStorage.getItem('cardData'))
            localData.forEach(e=> e.id === props.task.id? e.state = 'To Do':'');
            // let array = [...localData]
            localStorage.setItem('cardData', JSON.stringify(localData))
            window.location.reload();

            // props.funcionDragger(array);
            // props.updateData(array);
        }

        
      }

    if (props.task.state === 'To Do' || props.task.state === 'In Process') {

        return (
            <Draggable
            nodeRef={nodeRef}
            onStart={handleonMouse}
            onStop={(handleEvent)} 
            
            >
            {/* <div className='card'> */}
            <div ref={nodeRef} className={isDrag?'cardAboluste':'card'} >
                <div className="card__main-info">

                    <div className='card__main-info__icon' >
                        <MdOutlinePending color='#22863a' />

                        <p className='card__title' title="Click to change State" onClick={handleStatus}>{props.task.title}</p>
                    </div>
                    <div className='card__delete' title='Delete' onClick={handleClick}>
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
            nodeRef={nodeRef}

            onStart={handleonMouse}
            onStop={handleEvent} 
            >
            <div ref={nodeRef} className='card'>
                <div className="card__main-info">

                    <div className='card__main-info__icon' >
                        <MdCheckCircleOutline color='#cb2431' />


                        <p className='card__title' title="Click to change State" onClick={handleStatus}>{props.task.title}</p>
                    </div>
                    <div className='card__delete' title="Delete" onClick={handleClick}>
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