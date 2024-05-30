fetch("/getUserDetails")
    .then(response => response.json())
    .then(data => {
        const userDetailsDiv = document.getElementById("userDetails");
        userDetailsDiv.innerHTML = `<p><strong>Username:</strong> ${data.username}</p><p><strong>Email:</strong> ${data.email}</p>`;
    })
    .catch(error => console.error('Error:', error));
