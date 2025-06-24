let textI, textDepth, whitespaceRatio, previousWidth;
let defaultText = "Out of the trunk, the branches grow; out of them, the twigs. So, in productive subjects, grow the chapters. The crotch alluded to on a previous page deserves independent mention. It is a notched stick of a peculiar form, some two feet in length, which is perpendicularly inserted into the starboard gunwale near the bow, for the purpose of furnishing a rest for the wooden extremity of the harpoon, whose other naked, barbed end slopingly projects from the prow. Thereby the weapon is instantly at hand to its hurler, who snatches it up as readily from its rest as a backwoodsman swings his rifle from the wall. It is customary to have two harpoons reposing in the crotch, respectively called the first and second irons.But these two harpoons, each by its own cord, are both connected with the line; the object being this: to dart them both, if possible, one instantly after the other into the same whale; so that if, in the coming drag, one should draw out, the other may still retain a hold. It is a doubling of the chances. But it very often happens that owing to the instantaneous, violent, convulsive running of the whale upon receiving the first iron, it becomes impossible for the harpooneer, however lightning-like in his movements, to pitch the second iron into him. Nevertheless, as the second iron is already connected with the line, and the line is running, hence that weapon must, at all events, be anticipatingly tossed out of the boat, somehow and somewhere; else the most terrible jeopardy would involve all hands. Tumbled into the water, it accordingly is in such cases; the spare coils of box line (mentioned in a preceding chapter) making this feat, in most instances, prudently practicable. But this critical act is not always unattended with the saddest and most fatal casualties.Furthermore: you must know that when the second iron is thrown overboard, it thenceforth becomes a dangling, sharp-edged terror, skittishly curvetting about both boat and whale, entangling the lines, or cutting them, and making a prodigious sensation in all directions. Nor, in general, is it possible to secure it again until the whale is fairly captured and a corpse.Consider, now, how it must be in the case of four boats all engaging one unusually strong, active, and knowing whale; when owing to these qualities in him, as well as to the thousand concurring accidents of such an audacious enterprise, eight or ten loose second irons may be simultaneously dangling about him. For, of course, each boat is supplied with several harpoons to bend on to the line should the first one be ineffectually darted without recovery. All these particulars are faithfully narrated here, as they will not fail to elucidate several most important, however intricate passages, in scenes hereafter to be painted";
let backgroundText;
let charsPerLine;

let backgroundSpan = document.querySelector('#filler_text');
if (backgroundSpan) {
    backgroundText = backgroundSpan.innerHTML;
} else {
    backgroundText = defaultText;
}

function getCurrentBreakPoint() {
    const bigBreak = 2000;
    const desktopBreak = 1200;
    const tabletBreak = 915;
    const mobileBreak = 440;

    let breakPointTextWidth = 200; 
    if (window.innerWidth > bigBreak) {
        breakPointTextWidth = 130;
    }
    else if (window.innerWidth > desktopBreak) {
        breakPointTextWidth = 90;
    }
    else if (window.innerWidth > tabletBreak) {
        breakPointTextWidth = 80;
    }
    else if (window.innerWidth > mobileBreak) {
        breakPointTextWidth = 40;
    }
    else { // tiny
        breakPointTextWidth = 35;
    }
    return breakPointTextWidth;
}
 
function calculateFontSize() {
    const measureSpan = document.createElement('span');
    measureSpan.style.visibility = 'hidden';
    measureSpan.style.position = 'absolute';
    measureSpan.style.whiteSpace = 'nowrap';
    measureSpan.innerHTML = 'X';
    document.body.appendChild(measureSpan);

    const initialHeight = measureSpan.offsetHeight;
    const initialWidth = measureSpan.offsetWidth;
    const charRatio = initialHeight / initialWidth;

    document.body.removeChild(measureSpan);

    textI = 0;
    whitespaceRatio = 0.2; // aesthetic choice for center column width

    charsPerLine = getCurrentBreakPoint();
    
    let fontWidth = window.innerWidth / charsPerLine;
    let fontHeight = fontWidth * charRatio;
    textDepth = Math.floor(window.innerHeight / fontHeight);

    // Add debug logging
    const testString = 'X'.repeat(charsPerLine);
    const testSpan = document.createElement('span');
    testSpan.style.visibility = 'hidden';
    testSpan.style.position = 'absolute';
    testSpan.style.fontSize = fontHeight + 'px';
    testSpan.innerHTML = testString;
    document.body.appendChild(testSpan);

    console.log({
        windowWidth: window.innerWidth,
        charsPerLine,
        fontWidth,
        fontHeight,
        charRatio,
        calculatedTotalWidth: fontWidth * charsPerLine,
        actualStringWidth: testSpan.offsetWidth,
        difference: testSpan.offsetWidth - window.innerWidth
    });

    document.body.removeChild(testSpan);

    document.documentElement.style.setProperty('--line-height', fontHeight + 'px');
    document.body.style.fontSize = fontHeight + "px";
    document.body.style.lineHeight = fontHeight + "px";
}

function needToUpdate() {
    let currentWidth = getCurrentBreakPoint();
    let update = previousWidth != currentWidth;
    previousWidth = currentWidth;
    return update;
}

function updateIfNeeded(update) {
    calculateFontSize();
    let shouldUpdate = needToUpdate();
    if (shouldUpdate) {
        update()
    } 
}

function davinci_block(tag_id, vdepth, hdepth, text) {
    let left = mirrorText(tag_id + 'a', vdepth, hdepth, offset(text));
    let right = mirrorText(tag_id + 'b', 0, 1, Math.floor(charsPerLine * hdepth) + offset(text, false));
    let center = text.length;
    console.log({left, right, center, total: left + right + center});
    console.log({
        charsPerLine,
        actualTextWidth: text.length,
        offset: offset(text),
        floorOffset: offset(text, true),
        ceilOffset: offset(text, false)
    });
}

function creative_davinci_block(parent, vdepth, hdepth, text) {
    // create the left and right spans
    let left_span = document.createElement("span");
    left_span.classList.add("back");
    let right_span = document.createElement("span");
    right_span.classList.add("back");

    // add the spans to the parent
    parent.appendChild(left_span);
    parent.appendChild(right_span);

}
  
function offset(s, floor=true) {
    if (floor) {
        return  Math.floor(s.length / 2);
    } else {
        return  Math.ceil(s.length / 2);
    }
    
} 

function mirrorText(parent, depth, width, offset=0, doWait=false) {
    let span;
    if (typeof parent === 'object') {
        span = parent;
    }
    else {
        span = document.getElementById(parent);
    }
    span.innerHTML = ""; // delete everything in the span gives an error
    let charCount = (Math.floor(textDepth * depth) * charsPerLine) + Math.floor(charsPerLine * width) - offset;
    // for (let i = 0; i < charCount; i++) {
    //     let innerSpan = document.createElement("span");
    //     innerSpan.classList.add("mirror");
    //     innerSpan.innerHTML = generateText(textI++);
    //     span.appendChild(innerSpan);
    // }
    // do the same thing but with a 1 ms delay between each 10th character using a timeout
    let i = 0;
    let type = function() {
        let innerSpan = document.createElement("span");
        innerSpan.classList.add("mirror");
        innerSpan.innerHTML = generateText(textI++);
        span.appendChild(innerSpan);
        let r = Math.floor(Math.random() * Math.random() * 100);

        let wait = (i % 2 == 0) ? r : 0;
        if (i++ < charCount - 1) { // I'm not sure why we have to do this -1 
            if (doWait) {
                setTimeout(type, r);
            } else {
                type();
            }
        }
    }
    type();

    return charCount
}

function mirrorTextLiteral(parent, chars) {
    parent.innerHTML = ""; 
    for (let i = 0; i < chars; i++) {
        let innerSpan = document.createElement("span");
        innerSpan.classList.add("mirror");
        innerSpan.innerHTML = generateText(textI++);
        parent.appendChild(innerSpan);
    }
}

// create a text generator
function generateText(textI) {
    return backgroundText[backgroundText.length - ((textI + 1) % backgroundText.length )];
}

function post(parent, title, body, links) {
    davinci_line(parent, '');
    davinci_line(parent, '');
    davinci_line(parent, title)
    davinci_line(parent, '');
    block_text(parent, body);
}

function block_text(parent, text) {

    let maxLineLength = Math.floor(charsPerLine * (1 - whitespaceRatio));
    let i = 0;
    let max = 10000;
    while (text.length > 0 && i++ < max) {
        // find the last space before the maxLineLength
        let lineLength = text.length;
        let firstLineBreak = text.indexOf('\n');
        if (firstLineBreak > 0) {
            lineLength = firstLineBreak;
        }
        let line = text.substring(0, lineLength);
        if (line.length > maxLineLength) {
            line = text.substring(0, maxLineLength);
            let lastSpace = line.lastIndexOf(' ');
            if (lastSpace > 0) {
                lineLength = lastSpace;
            }
        }

        line = text.substring(0, lineLength).trim();
        davinci_line(parent, line);
        if (firstLineBreak == lineLength) {
            davinci_line(parent, '');
        }

        text = text.substring(lineLength);
    }
}

function davinci_line(parent, text, href=false, mode='center') {
    let padding_left, padding_right;
    if (mode == 'center') {
        padding_left  = Math.floor((charsPerLine - text.length) / 2);
        padding_right = Math.ceil((charsPerLine - text.length) / 2);
    } else if (mode == 'random') {
        padding_left  = Math.floor(Math.random() * (charsPerLine - text.length));
        padding_right = charsPerLine - padding_left - text.length;
    } else { // mode == 'left'
        padding_left  = charsPerLine * whitespaceRatio / 2 ;
        padding_right = charsPerLine - padding_left - text.length;
    }
    // console.log({charsPerLine, padding_left, padding_right, text}, text.length)
    
    let left_span = document.createElement("span");
    left_span.classList.add("back");
    let right_span = document.createElement("span");
    right_span.classList.add("back");

    parent.appendChild(left_span);
    mirrorTextLiteral(left_span, padding_left);
    let middle_span = document.createElement("span");
    middle_span.classList.add("invert");
    middle_span.innerHTML = text;

    if (href) {
        let link = document.createElement("a");
        link.href = href;
        link.classList.add("link");
        link.appendChild(middle_span);
        parent.appendChild(link);
    } else {
        parent.appendChild(middle_span);
    }
    parent.appendChild(right_span);
    mirrorTextLiteral(right_span, padding_right);
}
function davinci_fill(element, mode='center') {
    // Get the inner text length to calculate padding
    const text = element.innerText.trim(); // Trim any existing whitespace
    console.log({text});
    // Calculate padding similar to davinci_line
    let padding_left, padding_right;
    if (mode === 'center') {
        padding_left = Math.floor((charsPerLine - text.length) / 2);
        padding_right = Math.ceil((charsPerLine - text.length) / 2);
    } else if (mode === 'random') {
        padding_left = Math.floor(Math.random() * (charsPerLine - text.length));
        padding_right = charsPerLine - padding_left - text.length;
    } else { // mode === 'left'
        padding_left = charsPerLine * whitespaceRatio / 2;
        padding_right = charsPerLine - padding_left - text.length;
    }
    
    // Create a document fragment to avoid whitespace between elements
    const fragment = document.createDocumentFragment();
    
    // Create and fill the padding spans
    const left_span = document.createElement("span");
    left_span.classList.add("back");
    mirrorTextLiteral(left_span, padding_left);
    fragment.appendChild(left_span);
    
    // Create the middle content span
    const middle_span = document.createElement("span");
    middle_span.classList.add("invert");
    middle_span.innerHTML = element.innerHTML.trim();
    fragment.appendChild(middle_span);
    
    // Create and fill the right padding span
    const right_span = document.createElement("span");
    right_span.classList.add("back");
    mirrorTextLiteral(right_span, padding_right);
    fragment.appendChild(right_span);
    
    // Clear and rebuild the element using the fragment
    element.innerHTML = '';
    element.appendChild(fragment);
}

function header() {
    mirrorText("filler0a", 0, 1, 0);
    davinci_block("filler1", 0, .25, 'projects');
    davinci_block("filler2", 0, .5,  'alex calderwood');
    davinci_block("filler3", 0, .75, 'bio');
    davinci_block("filler4", 0, .25,'blog');

    let end = document.getElementById('end');
    if (end) {
        end.innerHTML = '';
        mirrorText(end, 10, 10, 0, doWait=true);
    }

    let end2 = document.getElementById('end2');
    if (end2) {
        end2.innerHTML = '';
        mirrorText(end2, 30, 30, 0, doWait=true);
    }

    let end3 = document.getElementById('end3');
    if (end3) {
        end3.innerHTML = '';
        mirrorText(end3, 1, 1, 0, doWait=true);
    }
}

function type_links(parent, links, mode) {
    davinci_line(parent, '');

    for (let link of links) {
        let text = link.innerHTML;
        let href = link.href;
        davinci_line(parent, text, href=href, mode=mode);
        davinci_line(parent, '');
    }
}

function retype_basic() {
    header();
    // TODO HERE I THINK THE PAGE ISN"T LOADED
    // let title = document.querySelector('#title-text');
    // title.style.display = 'none'; // hide it
    // title = title.innerHTML;
    // let title_node = document.querySelector('#title');
    // title_node.innerHTML = '';

    // let content = document.querySelector('#post-content');
    // content.style.display = 'none'; // hide it
    // content = content.innerHTML;
    // let content_node = document.querySelector('#content');
    // content_node.innerHTML = '';

    // let links = document.querySelectorAll('.link');
    // let links_node = document.querySelector('#links');
    // links_node.innerHTML = '';
    // for (let link of links) {
    //     link.style.display = 'none';
    // }

    // post(content_node, title, content, links);

    // if (links.length > 0) {
    //     davinci_line(content_node, '');
    //     davinci_line(content_node, '');
    //     davinci_line(links_node, 'links');
    // }

    // let end = document.querySelector('#actualEnd');
    // console.log('dav', {end});
    // end.innerHTML = '';
    // mirrorText(end, 10, 10, 0, doWait=false);

    // type_links(end, links);
}

function retype_post() {
    header();
    // TODO HERE I THINK THE PAGE ISN"T LOADED
    let title = document.querySelector('#title-text');
    title.style.display = 'none'; // hide it
    title = title.innerHTML;
    let title_node = document.querySelector('#title');
    title_node.innerHTML = '';

    let content = document.querySelector('#contenttext');
    content.style.display = 'none'; // hide it
    content = content.innerHTML;
    let content_node = document.querySelector('#content');
    content_node.innerHTML = '';

    let links = document.querySelectorAll('.link');
    let links_node = document.querySelector('#links');
    links_node.innerHTML = '';
    for (let link of links) {
        link.style.display = 'none';
    }

    post(content_node, title, content, links);

    if (links.length > 0) {
        davinci_line(content_node, '');
        davinci_line(content_node, '');
        davinci_line(links_node, 'links');
    }

    let end = document.querySelector('#actualEnd');
    console.log('dav', {end});
    end.innerHTML = '';
    mirrorText(end, 10, 10, 0, doWait=false);

    type_links(end, links);
}

function retype_blog() {
    davinci_block("filler1", 0.5, .5,  'coming soon?');
    mirrorText("filler5a", 1, 1, 0, doWait=true);
}

function retype_main() {
    davinci_block("filler1", 0.2, .3, 'projects');
    davinci_block("filler2", 0.2, .5, 'alex calderwood');
    davinci_block("filler3", 0.2, .7, 'bio');
    davinci_block("filler4", 0.2, .3, 'blog');
    mirrorText("filler5a", 1, 1, 0, doWait=true);
}

calculateFontSize();
previousWidth = getCurrentBreakPoint();