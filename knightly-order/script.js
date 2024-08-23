document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
    const nameDiv = document.getElementById('name');
    const heraldryDiv = document.getElementById('heraldry');

    function generateHeraldry(orderName) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white'];
        const shapes = ['circle', 'square', 'triangle', 'star'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        let svgShape;
        switch (randomShape) {
            case 'circle':
                svgShape = `<circle cx="100" cy="125" r="40" fill="${randomColor}" />`;
                break;
            case 'square':
                svgShape = `<rect x="60" y="85" width="80" height="80" fill="${randomColor}" />`;
                break;
            case 'triangle':
                svgShape = `<polygon points="100,65 140,165 60,165" fill="${randomColor}" />`;
                break;
            case 'star':
                svgShape = `<polygon points="100,50 115,90 155,90 125,115 135,155 100,130 65,155 75,115 45,90 85,90" fill="${randomColor}" />`;
                break;
        }

        return `
            <svg width="200" height="250" viewBox="0 0 200 250">
                <path d="M100 0 L200 50 L200 200 L100 250 L0 200 L0 50 Z" fill="#cccccc" stroke="#000000" stroke-width="5"/>
                ${svgShape}
                <text x="50%" y="230" font-size="14" text-anchor="middle" fill="#000000">${orderName}</text>
            </svg>
        `;
    }

    function generateOrder(data) {
        const prefix = data.prefix[Math.floor(Math.random() * data.prefix.length)];
        const holy = data.holy[Math.floor(Math.random() * data.holy.length)];
        const flower = data.flower[Math.floor(Math.random() * data.flower.length)];
        const animal = data.animal[Math.floor(Math.random() * data.animal.length)];
        const colour = data.colour[Math.floor(Math.random() * data.colour.length)];
        const cognomen = data.cognomen[Math.floor(Math.random() * data.cognomen.length)];

        const formats = data.formats;
        const randomFormat = formats[Math.floor(Math.random() * formats.length)];

        return randomFormat
            .replace("{prefix}", prefix)
            .replace("{holy}", holy)
            .replace("{flower}", flower)
            .replace("{animal}", animal)
            .replace("{colour}", colour)
            .replace("{cognomen}", cognomen);
    }

    function fetchAndGenerateOrder() {
        fetch('knights.json')
            .then(response => response.json())
            .then(data => {
                const randomOrder = generateOrder(data);
                nameDiv.textContent = randomOrder;
                heraldryDiv.innerHTML = generateHeraldry(randomOrder);
            });
    }

    generateButton.addEventListener('click', fetchAndGenerateOrder);
    copyButton.addEventListener('click', () => {
        const textToCopy = nameDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // Generate an order on load
    fetchAndGenerateOrder();
});