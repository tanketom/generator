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
                const colour = data.colour[Math.floor(Math.random() * data.colour.length)];
                const cognomen = data.cognomen[Math.floor(Math.random() * data.cognomen.length)];

                const formats = [
                    `${prefix} of ${holy}`,
                    `${prefix} of ${animal}`,
                    `${prefix} of ${colour} ${flower}`,
                    `${prefix} of ${flower} of ${holy}`,
                    `${prefix} of ${cognomen}`,
                    `${prefix} of ${colour} ${animal}`,
                    `${prefix} of ${flower} and ${animal}`,
                    `${prefix} of ${holy} and ${cognomen}`
                ];

                const randomOrder = formats[Math.floor(Math.random() * formats.length)];
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