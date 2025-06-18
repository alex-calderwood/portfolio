function resizeText(element) {
    // Resize children to match the parent width

    const parentWidth = element.offsetWidth;
    console.log('parentWidth:', parentWidth);
    
    // Get current font size from element
    const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    console.log('Current font size:', currentFontSize);
    
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = `${currentFontSize}px`;
    tempSpan.style.fontFamily = window.getComputedStyle(element).fontFamily;
    tempSpan.textContent = element.textContent.trim();
    
    // Add to document to measure
    document.body.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth;
    console.log('Text width:', textWidth);
    document.body.removeChild(tempSpan);
    
    // Calculate the ratio between container and text width
    const ratio = parentWidth / textWidth;
    console.log('Ratio:', ratio);
    
    // Calculate new font size
    const newFontSize = currentFontSize * ratio * 0.9;
    console.log('New font size:', newFontSize);
    
    // Apply the new font size
    element.style.fontSize = `${newFontSize}px`;
}

// Function to resize multiple elements
function resizeElements() {
    // Get all elements with description class
    const elements = document.getElementsByClassName('description');

    // Resize each element
    Array.from(elements).forEach(element => {
        resizeText(element);
    });
}

// Function to handle window resize
function handleResize() {
    resizeElements();
}

// Call on load and window resize
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize); 