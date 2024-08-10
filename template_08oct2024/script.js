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

