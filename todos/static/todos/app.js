document.querySelectorAll('input[type="checkbox"]').forEach(item => {
    item.addEventListener("click", function (e) {
        fetch(e.target.id+'/toggle')
            .then(response => response.json())
            .then(data => location.reload())
    })
});

document.querySelector('#frm-todo').addEventListener('submit', function(e){
    e.preventDefault();
    let newItemDescription = document.querySelector('[name="new_item"]').value;
    let CSRF = document.querySelector('[name="csrfmiddlewaretoken"]').value

    fetch('add', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': CSRF}, 
        body: JSON.stringify({'new_item': newItemDescription})
    })
    .then(response => response.json())
    .then(data => location.reload())
});