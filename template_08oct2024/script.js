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
                '{{profile.location}}': properties['profile.location'] || '',
                '{{profile.phone}}': properties['profile.phone'] || '',
                '{{profile.summary}}': properties['profile.summary'] || '',
                '{{profile.year}}': properties['profile.year'] || '',
                '{{profile.linkedin}}': properties['profile.linkedin'] || '',
                '{{profile.github}}': properties['profile.github'] || '',
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

document.addEventListener("DOMContentLoaded", function() {
AOS.init({
    duration: 1200, // duration of animation in ms
    easing: 'ease-in-out-sine', // easing function for animation
    once: true // whether animation should happen only once - while scrolling down
});

// Fetch experience, skills, education, and certificates data from JSON file
fetch('template_08oct2024/data.json')
    .then(response => response.json())
    .then(data => {
        const experienceContainer = document.getElementById('experience');
        const skillsTableBody = document.getElementById('skills-table').getElementsByTagName('tbody')[0];
        const educationContainer = document.getElementById('education');
        const certificatesContainer = document.getElementById('certificates-container');

        // Load Experience
        data.experience.forEach(exp => {
            const expDiv = document.createElement('div');
            expDiv.classList.add('experience-entry');
            expDiv.innerHTML = `
                <h4>${exp.title}</h4>
                <h4>${exp.company} - ${exp.location}</h4>
                <p><i>${exp.date}</i></p>
                <ul>${exp.description.map(desc => `<li>${desc}</li>`).join('')}</ul>
            `;
            experienceContainer.appendChild(expDiv);
        });

        // Load Skills
        Object.keys(data.skills).forEach(category => {
            const skillsRow = document.createElement('tr');
            skillsRow.innerHTML = `
                <td>${category}</td>
                <td>${data.skills[category].join(', ')}</td>
            `;
            skillsTableBody.appendChild(skillsRow);
        });

        // Load Education
        data.education.forEach(ed => {
            const edDiv = document.createElement('div');
            edDiv.classList.add('education-entry');
            edDiv.innerHTML = `
                <h4>${ed.school}</h4>
                <p>${ed.degree} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ${ed.year}</p>
                <p>${ed.grade}</p>
            `;
            educationContainer.appendChild(edDiv);
        });
        
        //Load Certificate
        data.certificates.forEach(cert => {
            const certTable = document.createElement('table');
            certTable.classList.add('collapse-table');
            
            certTable.innerHTML = `
                <thead>
                    <tr class="collapse-header" data-target="${cert.name.replace(/\s+/g, '_')}">
                        <th colspan="2">${cert.name}</th>
                    </tr>
                </thead>
                <tbody class="collapse-content ${cert.name.replace(/\s+/g, '_')}">
                    <tr><td>Issued by</td><td>${cert.issueOrganization}</td></tr>
                    <tr><td>Date</td><td>${cert.issueDate}</td></tr>
                    <tr><td>ID</td><td>${cert.credentialId}</td></tr>
                    <tr><td>Verification Link</td><td><a href="${cert.credentialUrl}" target="_blank">Verify</a></td></tr>
                </tbody>
            `;
            certificatesContainer.appendChild(certTable);
        });
        // Add event listeners for collapsible tables
        document.querySelectorAll('.collapse-header').forEach(header => {
            header.addEventListener('click', () => {
                const targetClass = header.getAttribute('data-target');
                const content = document.querySelector(`.collapse-content.${targetClass}`);
                content.classList.toggle('visible');
            });
        });
    })
    .catch(error => console.error('Error loading data:', error));
});


document.addEventListener("DOMContentLoaded", function() {
    //Mask phone number
    var maskedPhone = document.getElementById("maskedphone");
    var fullPhone = document.getElementById("fullphone");
    console.log(maskedPhone);
    if (maskedPhone === null) {
        console.error("Element with id 'masked-phone' not found.");
    } else {
        console.log("Masked phone element found:", maskedPhone);
    }

    if (fullPhone === null) {
        console.error("Element with id 'full-phone' not found.");
    } else {
        console.log("Full phone element found:", fullPhone);
    }
    maskedPhone.addEventListener("click", function() {
        if (maskedPhone.style.display === "none") {
            maskedPhone.style.display = "inline";
            fullPhone.style.display = "none";
        } else {
            maskedPhone.style.display = "none";
            fullPhone.style.display = "inline";
        }
    });

    fullPhone.addEventListener("click", function() {
        if (fullPhone.style.display === "none") {
            fullPhone.style.display = "inline";
            maskedPhone.style.display = "none";
        } else {
            fullPhone.style.display = "none";
            maskedPhone.style.display = "inline";
        }
    });
});