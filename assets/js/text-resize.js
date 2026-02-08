const SCALE_RATIO = 0.98;

function stretchInnerHTML(element) {
    // Get the parent container's content width (excluding padding/borders)
    const parent = element.parentElement;
    const goalWidth = parent.clientWidth;

    const computedStyle = window.getComputedStyle(element);
    
    // Get current font size from element
    const originalFontSize = parseFloat(computedStyle.fontSize);
    
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = `${originalFontSize}px`; // I forget why we need to do this, but using the computed with out parsing doesn't work
    tempSpan.style.fontFamily = computedStyle.fontFamily;

    console.log(tempSpan)
    
    // let textContent = element.textContent;      // text only
    // tempSpan.textContent = textContent          // text only
    tempSpan.innerHTML = element.innerHTML;        // all HTML
    
    // Add to document to measure
    document.body.appendChild(tempSpan);
    const computedOriginalWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    
    // Calculate the ratio between container and text width
    const ratio = goalWidth / computedOriginalWidth;
    
    // Calculate new font size
    const newFontSize = originalFontSize * ratio * SCALE_RATIO;
    // console.log(`${textContent?.slice(0, 20)}... rescaling font from ${originalFontSize} to ${newFontSize} to match computed width ${computedOriginalWidth} to goal width ${goalWidth}`);

    if (Math.abs(computedOriginalWidth - goalWidth) < 1) {
        console.log('no rescaling needed');
        return;
    }

    // Apply the new font size
    element.style.fontSize = `${newFontSize}px`;
}

// Function to stretch any .fullwidth element to the page width
function stretchFullWidthElements() {
    // Get all elements with description class
    const elements = document.getElementsByClassName('fullwidth');

    // Resize each element
    Array.from(elements).forEach(element => {
        stretchInnerHTML(element);
    });
}

