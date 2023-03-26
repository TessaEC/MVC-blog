const viewPostHandler = async (event) => {
    if (event.target.classList.contains('view-post')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/post/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            alert(response.statusText);
        }
    }
}
document.addEventListener('submit', viewPostHandler);