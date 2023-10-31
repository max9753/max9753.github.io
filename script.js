document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'max9753';  // Replace with your GitHub username
    const repoName = 'max9753.github.io'; // Replace with your repository name
    const pathToFolder = 'downloadData'; // The folder in your repository

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToFolder}`)
        .then(response => response.json())
        .then(data => {
            const fileListContainer = document.getElementById('file-list');
            fileListContainer.innerHTML = ''; // Clear the loading text

            data.forEach(file => {
                if (file.name.endsWith('.csv')) { // Check if it's a CSV file
                    const fileLink = document.createElement('a');
                    fileLink.href = file.download_url; // URL to download the file
                    fileLink.textContent = 'Download ' + file.name;
                    fileLink.download = file.name; // Suggest this filename when saving

                    const listItem = document.createElement('div');
                    listItem.appendChild(fileLink);
                    fileListContainer.appendChild(listItem);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching file list:', error);
            document.getElementById('file-list').textContent = 'Error loading files.';
        });
});