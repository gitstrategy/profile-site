function loadTemplate(url, element) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(element).innerHTML = data;
        });
}

function loadProfileData(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const properties = {};
            data.split('\n').forEach(line => {
                // Skip empty lines or lines that do not contain '='
                if (line.trim() === '' || !line.includes('=')) return;
                
                const [key, value] = line.split('=');

                // Check if key and value are defined
                if (key && value) {
                    properties[key.trim()] = value.trim();
                }
            });

            // Inject profile data into templates
            const placeholders = {
                '{{profile.name}}': properties['profile.name'] || '',
                '{{profile.position}}': properties['profile.position'] || '',
                '{{profile.contact}}': properties['profile.contact'] || '',
                '{{profile.summary}}': properties['profile.summary'] || '',
                '{{profile.year}}': properties['profile.year'] || '',
                '{{experience.list}}': properties['experience.list'] || ''
            };
            
            
            // Replace placeholders in header, content, and footer
            replacePlaceholders('header');
            replacePlaceholders('content');
            replacePlaceholders('footer');

            function replacePlaceholders(sectionId) {
                const section = document.querySelector(`#${sectionId}`);
                if (section) {
                    let html = section.innerHTML;
                    for (const [key, value] of Object.entries(placeholders)) {
                        html = html.replace(new RegExp(key, 'g'), value);
                    }
                    section.innerHTML = html;
                }
            }
        })
        .catch(error => console.error('Error loading profile data:', error));
}

// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Fetch experience data from JSON file
    fetch('template_08oct2024/data.json')
        .then(response => response.json())
        .then(data => {
            const experienceContainer = document.getElementById('experience');

            data.forEach(exp => {
                // Create a new div for each experience entry
                const expDiv = document.createElement('div');
                expDiv.classList.add('experience-entry');

                // Create and append title
                const title = document.createElement('h3');
                title.textContent = exp.title;
                expDiv.appendChild(title);

                // Create and append company
                const company = document.createElement('p');
                company.textContent = `${exp.company} - ${exp.location}`;
                expDiv.appendChild(company);

                // Create and append date
                const date = document.createElement('p');
                date.textContent = exp.date;
                expDiv.appendChild(date);

                // Create and append description
                const descList = document.createElement('ul');
                exp.description.forEach(desc => {
                    const listItem = document.createElement('li');
                    listItem.textContent = desc;
                    descList.appendChild(listItem);
                });
                expDiv.appendChild(descList);

                // Append experience entry to container
                experienceContainer.appendChild(expDiv);
            });
        })
        .catch(error => console.error('Error loading experience data:', error));
});
