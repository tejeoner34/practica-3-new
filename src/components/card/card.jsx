
import './style.css'

import React from 'react';
import trash from '../../assets/img/trash.png';
import { MdCheckCircleOutline } from "react-icons/md";
import { MdHighlightOff } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Card(props) {

    const handleClick = (e)=>{
        props.onDelete(props.task.id);
    }

    const handleStatus = (e)=>{
        props.onHandleStatus(props.task)
    }

    if (props.task.state === 'To Do' || props.task.state === 'In Process') {

        return (
            <div className="card">
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
        )
    } else {

        return (

            <div className="card">
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

        )


    }

}

export default Card;