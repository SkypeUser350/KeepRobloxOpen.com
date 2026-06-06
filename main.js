// KeepRobloxOpen.com - Core Campaign Logic Mechanics
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial State Configurations
    let baseCount = 14842;
    const goal = 20000;

    const sigCounter = document.getElementById('sigCounter');
    const progressBar = document.getElementById('progressBar');
    const petitionForm = document.getElementById('petitionForm');
    const usernameInput = document.getElementById('usernameInput');
    const submitBtn = document.getElementById('submitBtn');
    const discordBtn = document.getElementById('discordBtn');

    // 2. Check Browser Memory for Previous Signatures
    if (localStorage.getItem('hasSigned')) {
        baseCount += 1;
        usernameInput.value = localStorage.getItem('signedUser');
        usernameInput.disabled = true;
        submitBtn.innerText = "You Signed The Petition!";
        submitBtn.disabled = true;
    }

    // 3. Dynamic UI Render Engine
    function updateDisplay() {
        sigCounter.innerText = baseCount.toLocaleString();
        let percentage = (baseCount / goal) * 100;
        if (percentage > 100) percentage = 100;
        progressBar.style.width = percentage + "%";
    }

    // 4. Live Growth Simulation (Adds 1-3 signatures every 4 to 9 seconds)
    setInterval(() => {
        baseCount += Math.floor(Math.random() * 3) + 1;
        updateDisplay();
    }, Math.floor(Math.random() * 5000) + 4000);

    // 5. Signature Registration Form Listener
    petitionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        
        if (username.length < 3) return;

        // Save progress securely in local cache
        localStorage.setItem('hasSigned', 'true');
        localStorage.setItem('signedUser', username);
        
        baseCount += 1;
        updateDisplay();

        usernameInput.disabled = true;
        submitBtn.innerText = "Thank You, Soldier!";
        submitBtn.disabled = true;

        alert("Your signature has been registered! Now use the sharing buttons below to spread the word!");
    });

    // 6. Discord Instant Clipboard Copy Routine
    discordBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const movementText = 'Join the movement to save Roblox: https://KeepRobloxOpen.com';
        
        navigator.clipboard.writeText(movementText)
            .then(() => {
                alert('Movement link copied! Go paste it (CTRL+V) into your Discord servers right now!');
            })
            .catch(err => {
                console.error('Could not copy link text: ', err);
            });
    });

    // Run primary paint sequence on startup
    updateDisplay();
});
