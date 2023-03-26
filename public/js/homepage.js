const viewPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
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
};

document.querySelector('#view-post').addEventListener('click', viewPostHandler);