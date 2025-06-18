function resizeInnerHTML(element) {
    const goalWidth = element.offsetWidth;
    
    // Get current font size from element
    const originalFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = `${originalFontSize}px`;
    tempSpan.style.fontFamily = window.getComputedStyle(element).fontFamily;
    let textContent = element.textContent.trim();
    // tempSpan.textContent = textContent          // text only
    tempSpan.innerHTML = element.innerHTML.trim(); // all HTML
    
    // Add to document to measure
    document.body.appendChild(tempSpan);
    const computedOriginalWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Calculate the ratio between container and text width
    const ratio = goalWidth / computedOriginalWidth;
    
    // Calculate new font size
    const newFontSize = originalFontSize * ratio * 0.9;
    console.log(`${textContent?.slice(0, 10)}... rescaling font from ${originalFontSize} to ${newFontSize} to match computed width ${computedOriginalWidth} to goal width ${goalWidth}`);

    if (Math.abs(computedOriginalWidth - goalWidth) < 1) {
        console.log('no rescaling needed');
        return;
    }
    
    // Apply the new font size
    element.style.fontSize = `${newFontSize}px`;
}

// Function to resize multiple elements
function resizeElements() {
    // Get all elements with description class
    const elements = document.getElementsByClassName('description');

    // Resize each element
    Array.from(elements).forEach(element => {
        resizeInnerHTML(element);
    });
}

// Function to handle window resize
function handleResize() {
    resizeElements();
}

// Call on load and window resize
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize); 