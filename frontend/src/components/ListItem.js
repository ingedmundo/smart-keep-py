import React from 'react';

function ListItem(props) {
    const {data, toggle} = props;

    return (
        <li class="py-2" style={{background: data.is_to_be_bought ? 'lightyellow':'initial'}}>
            <label>
                <input
                type="checkbox"
                data-id={data.id}
                onChange={toggle}
                checked={data.done}
                /> {data.description} - ${data.cost}
            </label>
            <small>{data.delta_info}</small>
        </li>
    )
}

export default ListItem