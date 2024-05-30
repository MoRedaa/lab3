document.getElementById("addUserForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);

    fetch("/addUser", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("successMessage").classList.remove("hidden");
        this.reset();
    })
    .catch(error => console.error('Error:', error));
});
