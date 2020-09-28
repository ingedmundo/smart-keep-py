import React from 'react';

function ListItem(props) {
    const {data, toggle} = props;

    return (
        <li className="py-1" style={{background: data.is_to_be_bought ? 'lightyellow':'initial'}}>
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
            </div>
            <small className='d-none d-sm-inline-block text-muted'>
                {data.delta_info}
            </small>
        </li>
    )
}

export default ListItem