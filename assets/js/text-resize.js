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
    // Every property that changes text metrics must be mirrored here, or the
    // measurement won't match how the element actually renders and the
    // stretched line will over- or undershoot the column. (Small caps and
    // letter-spacing on the section headers are why this matters.)
    tempSpan.style.fontFamily = computedStyle.fontFamily;
    tempSpan.style.fontWeight = computedStyle.fontWeight;
    tempSpan.style.fontStyle = computedStyle.fontStyle;
    tempSpan.style.fontVariantCaps = computedStyle.fontVariantCaps;
    tempSpan.style.letterSpacing = computedStyle.letterSpacing;
    tempSpan.style.wordSpacing = computedStyle.wordSpacing;
    tempSpan.style.textTransform = computedStyle.textTransform;
    tempSpan.innerHTML = element.innerHTML;            // all HTML

    // Add to document to measure
    document.body.appendChild(tempSpan);
    let computedOriginalWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);

    if (!computedOriginalWidth) return; // text not laid out yet

    // CSS letter-spacing is added AFTER every character, the last one
    // included, so a tracked line carries a trailing gap of empty space.
    // Measuring it as part of the text makes the line stop short of the
    // column edge. Discount it so the visible ink is what fills the width.
    const tracking = parseFloat(computedStyle.letterSpacing);
    if (tracking) computedOriginalWidth -= tracking;

    // Scale the font so the line fills the column width
    const ratio = goalWidth / computedOriginalWidth;
    const newFontSize = originalFontSize * ratio * SCALE_RATIO;
    element.style.fontSize = `${newFontSize}px`;
}

// Function to stretch any .fullwidth element to the page width.
//
// Elements opted into the short-line gate (data-min-stretch-chars="N") whose
// text is under N characters are NOT stretched — blown up to fill the column,
// a few words become enormous. They're resolved in a second pass, after all
// normal lines are sized, so they can borrow the font size of the nearest
// stretched line in their block — before OR after them (a one-word body can
// only borrow from its links line below).
function stretchFullWidthElements() {
    const elements = Array.from(document.getElementsByClassName('fullwidth'));
    const shortLines = [];

    elements.forEach(element => {
        const minChars = parseInt(element.dataset.minStretchChars || '0', 10);
        if (minChars && element.textContent.trim().length < minChars) {
            shortLines.push(element);
        } else {
            stretchInnerHTML(element);
        }
    });

    shortLines.forEach(element => {
        const scope = element.closest('.post-expand-inner') || document.body;
        const stretched = Array.from(scope.querySelectorAll('.fullwidth'))
            .filter(el => el !== element && el.style.fontSize);

        // Nearest donor in document order, preferring the one before.
        let donor = null;
        for (const candidate of stretched) {
            const precedes = candidate.compareDocumentPosition(element)
                & Node.DOCUMENT_POSITION_FOLLOWING;
            if (precedes) {
                donor = candidate;          // keep updating: last one before us
            } else {
                if (!donor) donor = candidate; // first one after us
                break;
            }
        }

        element.style.fontSize = donor
            ? window.getComputedStyle(donor).fontSize
            : '';
        element.style.textAlign = 'left';
    });
}

