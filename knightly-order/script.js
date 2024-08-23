document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
    const nameDiv = document.getElementById('name');
    const heraldryDiv = document.getElementById('heraldry');

    function generateHeraldry() {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white'];
        const shapes = ['circle', 'square', 'triangle', 'star'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        let svgShape;
        switch (randomShape) {
            case 'circle':
                svgShape = `<circle cx="50" cy="50" r="40" fill="${randomColor}" />`;
                break;
            case 'square':
                svgShape = `<rect x="10" y="10" width="80" height="80" fill="${randomColor}" />`;
                break;
            case 'triangle':
                svgShape = `<polygon points="50,10 90,90 10,90" fill="${randomColor}" />`;
                break;
            case 'star':
                svgShape = `<polygon points="50,15 61,35 85,35 66,50 75,75 50,60 25,75 34,50 15,35 39,35" fill="${randomColor}" />`;
                break;
        }

        return `<svg width="100" height="100">${svgShape}</svg>`;
    }

    function generateOrder() {
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
                    `${prefix} of ${holy} and ${cognomen}`,
                    `${prefix} of the ${animal}s of ${holy} ${cognomen}`,
                    `${prefix} of the ${flower}s of ${holy} ${cognomen}`
                ];

                const randomOrder = formats[Math.floor(Math.random() * formats.length)];
                nameDiv.textContent = randomOrder;
                heraldryDiv.innerHTML = generateHeraldry();
            });
    }

    generateButton.addEventListener('click', generateOrder);
    copyButton.addEventListener('click', () => {
        const textToCopy = nameDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // Generate an order on load
    generateOrder();
});