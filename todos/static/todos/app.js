document.querySelectorAll('input[type="checkbox"]').forEach(item => {
    item.addEventListener("click", function (e) {
        document.querySelector('#frm-todo').submit();
    })
});