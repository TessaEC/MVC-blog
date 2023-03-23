// Login
const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Error: Incorrect username or password.");
    }
  }
};

const signupHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    if (username && password) {
        const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert("Error: Username already exists.");
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupHandler);

