document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
    const nameDiv = document.getElementById('name');

    generateButton.addEventListener('click', () => {
        fetch('knights.json')
            .then(response => response.json())
            .then(data => {
                const prefix = data.prefix[Math.floor(Math.random() * data.prefix.length)];
                const holy = data.holy[Math.floor(Math.random() * data.holy.length)];
                const flower = data.flower[Math.floor(Math.random() * data.flower.length)];
                const animal = data.animal[Math.floor(Math.random() * data.animal.length)];

                const randomOrder = `${prefix} ${holy}, ${flower}, ${animal}`;
                nameDiv.textContent = randomOrder;
            });
    });

    copyButton.addEventListener('click', () => {
        const textToCopy = nameDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});