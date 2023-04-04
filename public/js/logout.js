function redirect(url) {
    window.location.href = url;
  }

  //logout
const logoutHandler = async () => {

 const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        redirect('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);