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
                const randomOrder = data.generateOrder();
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