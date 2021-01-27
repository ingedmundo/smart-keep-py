import React from 'react';

function ListItem(props) {
    const {data, toggle, hide} = props;

    return (
        <li id={"item-wrapper-" + data.id} className="py-1" style={{background: data.is_to_be_bought ? 'lightyellow':'initial'}}>
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    data-id={data.id}
                    onChange={toggle}
                    checked={data.done} 
                    className="custom-control-input"
                    id={data.id}/>
                <label 
                    className="custom-control-label" 
                    htmlFor={data.id} >
                    {data.description} <em>- ${data.cost} </em>
                </label>
                <button data-id={data.id} className='btn btn-sm btn-secondary float-right d-none d-sm-block' onClick={hide}>Hide</button>
            </div>
            <small className='d-none d-sm-inline-block text-muted'>
                {data.delta_info}
            </small>
        </li>
    )
}

export default ListItem