document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lyricsForm');
    const sectionsContainer = document.getElementById('sectionsContainer');
    const addSectionButton = document.getElementById('addSectionButton');

    let sectionCount = 1;

    addSectionButton.addEventListener('click', () => {
        const newFieldset = document.createElement('fieldset');
        newFieldset.className = 'radio-fieldset';

        newFieldset.innerHTML = `
            <div class="radio">
                <input type="radio" name="section-type-${sectionCount}" id="intro-${sectionCount}">
                <label for="intro-${sectionCount}">Intro</label>
            </div>
            <div class="radio">
                <input type="radio" name="section-type-${sectionCount}" id="verse-${sectionCount}">
                <label for="verse-${sectionCount}">Verse</label>
            </div>
            <div class="radio">
                <input type="radio" name="section-type-${sectionCount}" id="chorus-${sectionCount}">
                <label for="chorus-${sectionCount}">Chorus</label>
            </div>
            <div class="radio">
                <input type="radio" name="section-type-${sectionCount}" id="hook-${sectionCount}">
                <label for="hook-${sectionCount}">Hook</label>
            </div>
            <div class="radio">
                <input type="radio" name="section-type-${sectionCount}" id="bridge-${sectionCount}">
                <label for="bridge-${sectionCount}">Bridge</label>
            </div>
        `;

        const newTextarea = document.createElement('textarea');
        newTextarea.name = `Lyrics-${sectionCount}`;
        newTextarea.id = `Lyrics-${sectionCount}`;
        newTextarea.className = 'textarea';
        newTextarea.placeholder = '...';

        sectionsContainer.appendChild(newFieldset);
        sectionsContainer.appendChild(newTextarea);

        sectionCount++;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const sections = [];

        for (let i = 0; i < sectionCount; i++) {
            const sectionType = formData.get(`section-type-${i}`);
            const lyrics = formData.get(`Lyrics-${i}`);
            sections.push({ sectionType, lyrics });
        }

        try {
            const response = await fetch(window.location.pathname, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sections }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.success) {
                window.location.href = '/some-success-page'; // Adjust the URL as needed
            } else {
                console.error('Submission failed:', result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
});