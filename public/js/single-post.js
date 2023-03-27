const updatePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector('#title').value.trim();
        const content = document.querySelector('#content').value.trim();
        if (title && content) {
            const response = await fetch(`/post/${id}`, {
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
        const response = await fetch(`/post/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const viewCommentHandler = async (event) => {
    if (event.target.classList.contains('view-comment')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comment/${id}`, {
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
document.addEventListener('submit', viewCommentHandler);
document.querySelector('#update-post').addEventListener('click', updatePostHandler);
document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
