import './kanban.css'
import TaskContainer from "../components/container-component/container-component";
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

function KanbanPage() {

    const toDoTitle = 'To Do';
    const inProcessTitle = 'In Process';
    const doneTitle = 'Done';

    const [toDo, updateToDo] = useState([]);
    const [inProcess, updateInProcess] = useState([]);
    const [done, updateDone] = useState([]);
    let [lastUpdate, setLastUpdate] = useState('')
    let toDoArray = [];
    let inprocessArray = [];
    let doneArray = [];

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('cardData'));
        const localStorageTime = localStorage.getItem('lastUpdate');
        localData?.forEach(e => {

            if (e.state === toDoTitle) {
                toDoArray.push(e);

            } else if (e.state === inProcessTitle) {
                inprocessArray.push(e);

            } else if (e.state === doneTitle) {
                doneArray.push(e);
            }

        })
        // localStorage.setItem('toDoData', JSON.stringify(toDoArray));
        updateToDo(oldValue => oldValue.concat(toDoArray));
        updateInProcess(oldProcess => oldProcess.concat(inprocessArray));
        updateDone(oldDone => oldDone.concat(doneArray));
        setLastUpdate(localStorageTime)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateData = (childata) => {

        childata?.forEach(e => {

            if (e.state === toDoTitle) {
                toDoArray.push(e);

            }

            if (e.state === inProcessTitle) {
                inprocessArray.push(e);

            }

            if (e.state === doneTitle) {
                doneArray.push(e);
            }

        })
        // localStorage.setItem('toDoData', JSON.stringify(toDoArray));
        updateToDo(toDoArray);
        updateInProcess(inprocessArray);
        updateDone(doneArray);
        let today = new Date();
        let date = today.getDate() + ' ' + today.toLocaleString('default', { month: 'short' });
        let finalTime = date;
        localStorage.setItem('lastUpdate', finalTime);
        let localStorageTime = localStorage.getItem('lastUpdate');
        setLastUpdate(localStorageTime)

    }

    const onDelete = (childata) => {
        let storageLocal = JSON.parse(localStorage.getItem('cardData'));
        storageLocal?.forEach((e, index) => {
            if (e.id === childata) {
                storageLocal.splice(index, 1);
                localStorage.setItem('cardData', JSON.stringify(storageLocal));
                updateData(storageLocal);
            }
        })
    }

    const onDeleteAllData = () => {
        let storageLocal = JSON.parse(localStorage.getItem('cardData'));

        storageLocal?.forEach((e, index) => {
            if (e.state === 'Done') {
                console.log(storageLocal);
                storageLocal.splice(index);
                console.log(storageLocal);
                localStorage.setItem('cardData', JSON.stringify(storageLocal));
            }
        })
        updateDone([])
    }

    const onHandleStatus = (childata) => {
        let storageLocal = JSON.parse(localStorage.getItem('cardData'));
        storageLocal?.forEach(e => {
            if (childata.state === 'To Do' && e.id === childata.id) {
                e.state = 'In Process';
                localStorage.setItem('cardData', JSON.stringify(storageLocal));
                updateData(storageLocal);
            }

            if (childata.state === 'In Process' && e.id === childata.id) {
                e.state = 'Done';
                localStorage.setItem('cardData', JSON.stringify(storageLocal));
                updateData(storageLocal);
            }

            if (childata.state === 'Done' && e.id === childata.id) {
                e.state = 'In Process';
                localStorage.setItem('cardData', JSON.stringify(storageLocal));
                updateData(storageLocal);
            }
        })
    }

    const filterData = (e) => {

        const item = e.target.value;
        console.log(item);
        const localData = JSON.parse(localStorage.getItem('cardData'));
        const filteredData = localData.filter(e => e.title.toLowerCase().includes(item))
        updateData(filteredData);

    }

    const gestionDrag = (datos) => {
        updateData(datos);
    }


    return (

        <div className='main'>

            <div className='subheader'>
                <div className='subheader__info'>
                    <div>
                        <b>Version 1.0</b>
                    </div>
                    <div className='subheader__last-upadte'>
                        <p>Updated on {lastUpdate}</p>
                    </div>
                </div>
                <div className='subheader__filter'>
                    <input onChange={filterData} type="search" placeholder="🔎 Filter Card" />
                </div>
            </div>
            <div className='task-container__container'>
                <TaskContainer name={toDoTitle} key='1' task={toDo}
                    updateData={updateData} onDelete={onDelete}
                    onHandleStatus={onHandleStatus} onDeleteAllData={onDeleteAllData}
                    handleDrag={gestionDrag}  ></TaskContainer>

                <TaskContainer name={inProcessTitle} key='2'
                    task={inProcess} updateData={updateData} onDelete={onDelete}
                    onHandleStatus={onHandleStatus} onDeleteAllData={onDeleteAllData}
                    handleDrag={gestionDrag} ></TaskContainer>
                    
                <TaskContainer name={doneTitle} key='3'
                    task={done} updateData={updateData} onDelete={onDelete}
                    onHandleStatus={onHandleStatus} onDeleteAllData={onDeleteAllData}
                    handleDrag={gestionDrag} ></TaskContainer>
            </div>
        </div>
    )
}

export default KanbanPage;