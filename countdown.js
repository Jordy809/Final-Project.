

//  event dates
const eventDates = [
    new Date(2026, 2, 3),   // March 3, 2026
    new Date(2026, 2, 10),  // March 10, 2026
    new Date(2026, 2, 26),  // March 26, 2026
    new Date(2026, 4, 5)    // May 5, 2026
];

// calculations core function
function updateAllCountdowns() {
    // Get current time in milliseconds
    const now = new Date().getTime();
    
    // Loop through all 4 events
    for (let i = 0; i < 4; i++) {
        // Get this event's date
        const eventTime = eventDates[i].getTime();
        const timeLeft = eventTime - now;
        
        //  display the countdown
        // don't forget to id it in the html file
        const displayElement = document.getElementById(`countdown${i + 1}`);
        
        if (!displayElement) continue; // Skip if element doesn't exist
        
        // Check if event has passed
        if (timeLeft < 0) {
            displayElement.innerHTML = '<div style="color: gray; padding: 10px; text-align: center;">Event has passed</div>';
            continue;
        }
        
        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Format numbers add the 0 infront of each single digit
        const formatNumber = (num) => num < 10 ? `0${num}` : num;
        
        // Update the display
        displayElement.innerHTML = `
            <div style="display: flex; justify-content: space-around; text-align: center; padding: 10px; background: #f5f5f5; border-radius: 5px;">
                <div>
                    <div style="font-size: 24px; font-weight: bold; color: #3498db;">${formatNumber(days)}</div>
                    <div style="font-size: 12px; color: #666;">Days</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold; color: #3498db;">${formatNumber(hours)}</div>
                    <div style="font-size: 12px; color: #666;">Hours</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold; color: #3498db;">${formatNumber(minutes)}</div>
                    <div style="font-size: 12px; color: #666;">Minutes</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold; color: #3498db;">${formatNumber(seconds)}</div>
                    <div style="font-size: 12px; color: #666;">Seconds</div>
                </div>
            </div>
        `;
    }
}

// 3. Start the countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update immediately
    updateAllCountdowns();
    
    // Update every second (1000 milliseconds)
    setInterval(updateAllCountdowns, 1000);
});

