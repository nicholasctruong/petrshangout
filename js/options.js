function displaySavedMessage() {
    let status = document.getElementById('status');
    status.textContent = 'Color Saved';
}

function getColorValue() {
    const rbs = document.querySelectorAll('input[name="theme"]');
    let colorValue;
    for (const rb of rbs) {
        if (rb.checked) {
            colorValue = rb.value;
            break;
        }
    }
    return colorValue;
}

function setColorValue(colorValue) {
    const rbs = document.querySelectorAll('input[name="theme"]');

    for (const rb of rbs) {
        console.log(colorValue);
        console.log(rb.value);
        if (colorValue === rb.value) {
            rb.checked = true;
        }
    }
}

function save() {
    let color = getColorValue();

    chrome.storage.sync.set({
        selected_color: color
    }, displaySavedMessage);
}

function load() {
    chrome.storage.sync.get({
        selected_color: 'yellow'
    }, function(items) {
        setColorValue(items.selected_color);
    });
}
document.getElementById('form_theme').addEventListener('click', save);
document.addEventListener('DOMContentLoaded', load);