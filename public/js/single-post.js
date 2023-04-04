const updatePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector('#update-title').value.trim();
        const content = document.querySelector('#update-content').value.trim();
        if (title && content) {
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        }
    }
};

const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const addCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#new-comment').value.trim();
        if (comment) {
            const response = await fetch(`/api/post/${id}`, {
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



document.querySelector('#update-post').addEventListener('click', updatePostHandler);
document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
document.querySelector('#add-comment').addEventListener('submit', addCommentHandler);
