const SCALE_RATIO = 0.98;

function stretchInnerHTML(element) {
    // Get the parent container's content width (excluding padding/borders)
    const parent = element.parentElement;
    const goalWidth = parent.clientWidth;

    // Always measure from the stylesheet's base size, not a size we applied on
    // an earlier pass. If an early run (before CSS/fonts are ready) measured a
    // zero width, the old code would lock font-size to 0px permanently, since
    // 0 * ratio is always 0 — leaving the whole page blank. Clearing first
    // makes each pass recompute from scratch and recover.
    element.style.fontSize = '';
    const computedStyle = window.getComputedStyle(element);
    const originalFontSize = parseFloat(computedStyle.fontSize);

    // Not measurable yet (no base size or the column has no width) — bail out
    // rather than write a broken size. A later resize/font-load pass will fix it.
    if (!originalFontSize || !goalWidth) return;

    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = `${originalFontSize}px`; // measuring needs the parsed px value
    tempSpan.style.fontFamily = computedStyle.fontFamily;
    tempSpan.innerHTML = element.innerHTML;            // all HTML

    // Add to document to measure
    document.body.appendChild(tempSpan);
    const computedOriginalWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);

    if (!computedOriginalWidth) return; // text not laid out yet

    // Scale the font so the line fills the column width
    const ratio = goalWidth / computedOriginalWidth;
    const newFontSize = originalFontSize * ratio * SCALE_RATIO;
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

