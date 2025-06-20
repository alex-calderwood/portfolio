function resizeInnerHTML(element) {
    // Get the parent container's content width (excluding padding/borders)
    const parent = element.parentElement;
    const goalWidth = parent.clientWidth;
    
    // Get current font size from element
    const originalFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = `${originalFontSize}px`;
    tempSpan.style.fontFamily = window.getComputedStyle(element).fontFamily;
    let textContent = element.textContent;
    // tempSpan.textContent = textContent          // text only
    tempSpan.innerHTML = element.innerHTML; // all HTML
    
    // Add to document to measure
    document.body.appendChild(tempSpan);
    const computedOriginalWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    
    // Calculate the ratio between container and text width
    const ratio = goalWidth / computedOriginalWidth;
    
    // Calculate new font size
    const newFontSize = originalFontSize * ratio * 0.98;
    // console.log(`${textContent?.slice(0, 20)}... rescaling font from ${originalFontSize} to ${newFontSize} to match computed width ${computedOriginalWidth} to goal width ${goalWidth}`);

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
    // const elements = document.getElementsByClassName('fullwidth');

    // get .fullwidth children of #heading-content
    // const headingContent = document.getElementById('heading-content');
    // const elements = headingContent.getElementsByClassName('fullwidth');
    const elements = document.getElementsByClassName('fullwidth');

    // Resize each element
    Array.from(elements).forEach(element => {
        resizeInnerHTML(element);
    });

    // After resizing, set padding-top on #heading-content to height of #hi
    const hi = document.getElementById('hi');
    const headingContent = document.getElementById('heading-content');
    if (hi && headingContent) {
        headingContent.style.paddingTop = hi.offsetHeight + 'px';
    }
}

// Function to handle window resize
function handleResize() {
    resizeElements();
}

// Call on load and window resize
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize); 