import React, { useState } from 'react';
import Form from '../form/form';
import './container-component.css'
import Card from '../card/card';


function TaskContainer(props) {


    const [isOver, setIsOver] = useState(true);

    const handleSubmit = (e) => {
        let counterLocal = JSON.parse(localStorage.getItem('counter'));
        let arrayData = JSON.parse(localStorage.getItem('cardData'));
        if (counterLocal === null) counterLocal = 1;
        if (arrayData === null) arrayData = [];
        let today = new Date();
        let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateAndTime = date + ' ' + time;
        const cardData = {
            title: e,
            id: counterLocal,
            date: dateAndTime,
            state: props.name,
        };
        arrayData.push(cardData);
        localStorage.setItem(`cardData`, JSON.stringify(arrayData));
        counterLocal++;
        localStorage.setItem('counter', counterLocal);
        props.updateData(arrayData);
    };

    const [show, setShow] = useState(false);

    const handleDetele = (childata) => {
        props.onDelete(childata);
    };

    const handleStatus = (childata) => {
        props.onHandleStatus(childata);
    };

    const funcionDrag = (datos) => {
        props.handleDrag(datos)
    };

    const isDragging = (childata) => {
        setIsOver(childata);
    };


    if (props.name === 'Done') {
        return (
            <div className={isOver ? 'task-container' : 'task-containerNoOver'}>
                <div className='task-container__top-bar'>
                    <div className='task-container__task-counter'>
                        <p>{props.task?.length}</p>
                    </div>
                    <h4>{props.name}</h4>
                    <div className='task-container__button-div'>
                        <button title='Display task creator' className='task-container__add-button' onClick={(e) => setShow(!show)}>+</button>
                        <span onClick={props.onDeleteAllData} className='task-container__clear-button'>Clear All</span>
                    </div>
                </div>

                {
                    show ? (
                        <Form handleSubmit={handleSubmit} setShow={setShow} ></Form>
                    ) : null
                }
                <div className={isOver ? 'task-container__cards' : 'task-container__cards--noOver'}>
                    {props.task?.map((e, index) => <Card key={index} task={e} isDragging={isDragging} funcionDragger={funcionDrag} index={index} onDelete={handleDetele} onHandleStatus={handleStatus} updateData={props.updateData}  ></Card>)}
                </div>
            </div>
        )
    } else {
        return (
            <div className={isOver ? 'task-container' : 'task-containerNoOver'}>
                <div className='task-container__top-bar'>
                    <div className='task-container__task-counter'>
                        <p>{props.task?.length}</p>
                    </div>
                    <h4>{props.name}</h4>
                    <button title='Display task creator' className='task-container__add-button' onClick={(e) => setShow(!show)}>+</button>
                </div>

                {
                    show ? (
                        <Form handleSubmit={handleSubmit} setShow={setShow} ></Form>

                    ) : null
                }

                <div className={isOver ? 'task-container__cards' : 'task-container__cards--noOver'}>


                    {props.task?.map((e, index) => <Card key={index} isDragging={isDragging} task={e} index={index} funcionDragger={funcionDrag} onDelete={handleDetele} onHandleStatus={handleStatus} ></Card>)}
                </div>
            </div>
        )
    }

}

export default TaskContainer;