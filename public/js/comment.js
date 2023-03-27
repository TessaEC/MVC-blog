const addCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#comment').value.trim();
        if (comment) {
            const response = await fetch(`/api/comment/${id}`, {
                method: 'POST',
                body: JSON.stringify({ comment }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        }
    }
};

const updateCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#comment').value.trim();
        if (comment) {
            const response = await fetch(`/api/comment/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ comment }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/single-post');
            } else {
                alert(response.statusText);
            }
        }
    }
};

const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/comment/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#add-comment').addEventListener('click', addCommentHandler);
document.querySelector('#update-comment').addEventListener('click', updateCommentHandler);
document.querySelector('#delete-comment').addEventListener('click', deleteCommentHandler);