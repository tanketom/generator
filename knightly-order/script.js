document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
    const nameDiv = document.getElementById('name');
    const heraldryDiv = document.getElementById('heraldry');

    function generateHeraldry(color) {
        const size = 200; // Size of the heraldry image
        const format = 'svg'; // Format of the heraldry image

        return fetch(`https://armoria.herokuapp.com/?size=${size}&format=${format}&tincture=${color}`)
            .then(response => response.text())
            .then(svg => {
                return svg;
            })
            .catch(error => {
                console.error('Error fetching heraldry:', error);
                return '<p>Failed to generate heraldry. Please try again.</p>';
            });
    }

    function generateOrder(data) {
        const prefix = data.prefix[Math.floor(Math.random() * data.prefix.length)];
        const holy = data.holy[Math.floor(Math.random() * data.holy.length)];
        const flower = data.flower[Math.floor(Math.random() * data.flower.length)];
        const animal = data.animal[Math.floor(Math.random() * data.animal.length)];
        const colour = data.colour[Math.floor(Math.random() * data.colour.length)];
        const cognomen = data.cognomen[Math.floor(Math.random() * data.cognomen.length)];
        const area = data.area[Math.floor(Math.random() * data.area.length)];

        const formats = data.formats;
        const randomFormat = formats[Math.floor(Math.random() * formats.length)];

        const orderName = randomFormat
            .replace("{prefix}", prefix)
            .replace("{holy}", holy)
            .replace("{flower}", flower)
            .replace("{animal}", animal)
            .replace("{colour}", colour)
            .replace("{cognomen}", cognomen)
            .replace("{area}", area);

        return { orderName, colour };
    }

    function fetchAndGenerateOrder() {
        fetch('knights.json')
            .then(response => response.json())
            .then(data => {
                const { orderName, colour } = generateOrder(data);
                nameDiv.textContent = orderName;
                return generateHeraldry(colour);
            })
            .then(svg => {
                heraldryDiv.innerHTML = svg;
            })
            .catch(error => {
                console.error('Error fetching knights.json:', error);
                nameDiv.textContent = 'Failed to generate order. Please try again.';
            });
    }

    generateButton.addEventListener('click', fetchAndGenerateOrder);
    copyButton.addEventListener('click', () => {
        const textToCopy = nameDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // Generate an order on load
    fetchAndGenerateOrder();
});