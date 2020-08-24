import React from 'react';

function ListItem(props) {
    const {data, toggle} = props;

    return (
        <li class="py-2">
            <label>
                <input
                type="checkbox"
                data-id={data.id}
                onChange={toggle}
                checked={data.done}
                /> {data.description} - ${data.cost}
            </label>
        </li>
    )
}

export default ListItem