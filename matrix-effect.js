document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.matrix');
    if (!canvas) {
        console.error("Matrix canvas element not found!");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to full screen
    let vw, vh;

    function setCanvasDimensions() {
        vw = window.innerWidth;
        vh = window.innerHeight;
        canvas.width = vw;
        canvas.height = vh;
    }

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Characters for the Matrix effect (e.g., Japanese, Katakana, Binary, Hex)
    // You can customize this array with other cyber-related characters
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const binary = "01";
    const hex = "0123456789ABCDEF";
    const cyberChars = "!@#$%^&*()_+{}[]:;<>,.?/|`~" + binary + hex; // Combine various cyber-like chars

    // Increase font size and column width slightly for a bolder look
    const fontSize = 16; // Font size in pixels
    const columns = Math.floor(vw / fontSize); // Number of columns
    const drops = Array(columns).fill(0); // Each element represents the y-position of a character in a column

    function drawMatrix() {
        // Darken the canvas to create the fading trail effect
        ctx.fillStyle = "rgba(15, 0, 30, 0.05)"; // Dark background with a slight alpha for trail
        ctx.fillRect(0, 0, vw, vh);

        ctx.fillStyle = "#0F0"; // Green text for the Matrix effect
        ctx.font = `${fontSize}px monospace`; // Monospace font for consistent character width

        for (let i = 0; i < drops.length; i++) {
            const text = cyberChars[Math.floor(Math.random() * cyberChars.length)]; // Random cyber character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Send the drop back to the top randomly after it has crossed the screen
            // Lowering the random threshold (e.g., 0.97 to 0.95) will make it rain faster/more dense
            if (drops[i] * fontSize > vh && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment y-position
            drops[i]++;
        }
    }

    // Set a consistent animation frame rate
    let lastFrameTime = 0;
    const frameRate = 30; // frames per second
    const frameInterval = 1000 / frameRate; // milliseconds per frame

    function animate(currentTime) {
        if (currentTime - lastFrameTime >= frameInterval) {
            drawMatrix();
            lastFrameTime = currentTime;
        }
        requestAnimationFrame(animate);
    }

    animate(0); // Start the animation
});
