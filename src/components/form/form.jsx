import './form.css';
import { useState } from 'react';

function Form(props) {

    const [isEmpty, setIsEmpty] = useState(true);

    const handleEmpty = (e)=>{
        e.target.value === ''? setIsEmpty(true): setIsEmpty(false)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        props.handleSubmit(e.target.info.value)
    }

    

    return (
        <form onSubmit={handleSubmit} className='form'>
            <input onChange={handleEmpty} name='info' type="text" placeholder='Enter a note'  />
            <div className='form__button-container'>
                <button className='form__add-button' className={isEmpty? 'form__add-button-opacity' : 'form__add-button'} disabled={isEmpty} type='submit'>Add</button>
                <button className='form__cancel-button' type="button" onClick={() => props.setShow(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default Form;