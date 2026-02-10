//finding my tools
const form = document.getElementById("event-form");
const input = document.getElementById("event-input");
const list = document.getElementById("events-list");

// Load saved events when page opens
document.addEventListener("DOMContentLoaded", loadEvents);

// Add event when form is submitted
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const eventText = input.value.trim();
    
    if (eventText === "") {
        showFeedback("Please enter an event", "error");
        return;
    }
    
    const eventId = Date.now().toString();
    addEventToList(eventText, eventId);
    saveEvent(eventText, eventId);
    
    showFeedback("Event added successfully!", "success");
    input.value = "";
    input.focus();
});

// Function → Add event to page with delete button
function addEventToList(text, id) {
    const li = document.createElement("li");
    li.dataset.id = id;
    
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.className = "event-text";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function() {
        deleteEvent(id);
        li.remove();
        showFeedback("Event deleted", "info");
    });
    
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Function → Save event in localStorage with ID
function saveEvent(text, id) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({ id, text, date: new Date().toISOString() });
    localStorage.setItem("events", JSON.stringify(events));
}

// Function → Load saved events
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(event => addEventToList(event.text, event.id));
}

// Function → Delete event from storage
function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.id !== id);
    localStorage.setItem("events", JSON.stringify(events));
}

// Function → Show user feedback
function showFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector(".feedback");
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create new feedback element
    const feedback = document.createElement("div");
    feedback.textContent = message;
    feedback.className = `feedback feedback-${type}`;
    
    // Add to page (adjust selector based on your HTML structure)
    form.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 3000);
}

// Better beforeunload - only warn if there's substantial text
window.addEventListener("beforeunload", function(e) {
    const eventText = input.value.trim();
    if (eventText.length > 10) { // Only warn for longer text
        e.preventDefault();
        e.returnValue = "You have unsaved event text. Are you sure you want to leave?";
    }
});

// Optional: Add input validation
input.addEventListener("input", function() {
    if (this.value.length > 200) {
        this.value = this.value.substring(0, 200);
        showFeedback("Event text limited to 200 characters", "warning");
    }
});
