let textWidth, textI, textDepth, whitespaceRatio;

function caclulate_stuffs() {
    textI = 0;
    whitespaceRatio = 0.2

    const charRatio = 20 / 12.01;
    const bigBreak = 2000;
    const desktopBreak = 1200;
    const tabletBreak = 915;
    const mobileBreak = 440;

    textWidth = 200; 
    if (window.innerWidth > bigBreak) {
        textWidth = 130;
    }
    else if (window.innerWidth > desktopBreak) {
        textWidth = 90;
    }
    else if (window.innerWidth > tabletBreak) {
        textWidth = 80;
    }
    else if (window.innerWidth > mobileBreak) {
        textWidth = 40;
    }
    else { // tiny
        textWidth = 23;
    }

    let fontWidth = window.innerWidth / textWidth; // pixels
    let fontHeight = fontWidth * charRatio; // pixels
    textDepth = Math.floor(window.innerHeight / fontHeight); // lines`

    // // set the style of the body to match the font size
    document.body.style.fontSize = fontHeight + "px";
    document.body.style.lineHeight = fontHeight + "px";

    // let numChars = textDepth * textWidth; 
}

function davinci_block(tag_id, vdepth, hdepth, text) {
    let left = mirrorText(tag_id + 'a', vdepth, hdepth, offset(text));
    let right = mirrorText(tag_id + 'b', 0, 1, Math.floor(textWidth * hdepth) + offset(text, false));
    let center = text.length;
    console.log({textWidth, text},  {left, center, right}, left + right + center); 
}
  
function offset(s, floor=true) {
    if (floor) {
        return  Math.floor(s.length / 2);
    } else {
        return  Math.ceil(s.length / 2);
    }
    
} 
 
function mirrorText(parent, depth, width, offset=0) {
    let span;
    if (typeof parent === 'object') {
        span = parent;
    }
    else {
        span = document.getElementById(parent);
    }
    span.innerHTML = ""; // delete everything in the span gives an error
    let charCount = (Math.floor(textDepth * depth) * textWidth) + Math.floor(textWidth * width) - offset
    console.log({offset, charCount});
    for (let i = 0; i < charCount; i++) {
        let innerSpan = document.createElement("span");
        innerSpan.classList.add("mirror");
        innerSpan.innerHTML = generateText(textI++);
        span.appendChild(innerSpan);
    }
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
    // var text = "";
    // var possible = "abcdefghijklmnopqrstuvwxyz ";
    // text = possible.charAt(Math.floor(Math.random() * possible.length));
    // return text;
    const text = "Out of the trunk, the branches grow; out of them, the twigs. So, in productive subjects, grow the chapters. The crotch alluded to on a previous page deserves independent mention. It is a notched stick of a peculiar form, some two feet in length, which is perpendicularly inserted into the starboard gunwale near the bow, for the purpose of furnishing a rest for the wooden extremity of the harpoon, whose other naked, barbed end slopingly projects from the prow. Thereby the weapon is instantly at hand to its hurler, who snatches it up as readily from its rest as a backwoodsman swings his rifle from the wall. It is customary to have two harpoons reposing in the crotch, respectively called the first and second irons.But these two harpoons, each by its own cord, are both connected with the line; the object being this: to dart them both, if possible, one instantly after the other into the same whale; so that if, in the coming drag, one should draw out, the other may still retain a hold. It is a doubling of the chances. But it very often happens that owing to the instantaneous, violent, convulsive running of the whale upon receiving the first iron, it becomes impossible for the harpooneer, however lightning-like in his movements, to pitch the second iron into him. Nevertheless, as the second iron is already connected with the line, and the line is running, hence that weapon must, at all events, be anticipatingly tossed out of the boat, somehow and somewhere; else the most terrible jeopardy would involve all hands. Tumbled into the water, it accordingly is in such cases; the spare coils of box line (mentioned in a preceding chapter) making this feat, in most instances, prudently practicable. But this critical act is not always unattended with the saddest and most fatal casualties.Furthermore: you must know that when the second iron is thrown overboard, it thenceforth becomes a dangling, sharp-edged terror, skittishly curvetting about both boat and whale, entangling the lines, or cutting them, and making a prodigious sensation in all directions. Nor, in general, is it possible to secure it again until the whale is fairly captured and a corpse.Consider, now, how it must be in the case of four boats all engaging one unusually strong, active, and knowing whale; when owing to these qualities in him, as well as to the thousand concurring accidents of such an audacious enterprise, eight or ten loose second irons may be simultaneously dangling about him. For, of course, each boat is supplied with several harpoons to bend on to the line should the first one be ineffectually darted without recovery. All these particulars are faithfully narrated here, as they will not fail to elucidate several most important, however intricate passages, in scenes hereafter to be painted";

    return text[text.length - ((textI + 1) % text.length )];
}

function post(parent, title, body) {
    davinci_line(parent, '');
    davinci_line(parent, title)
    davinci_line(parent, '');
    block_text(parent, body);
    
    let end = document.createElement("span");
    end.classList.add("back");
    parent.appendChild(end);
    mirrorText(end, 1, 1, 0);
    
}

function block_text(parent, text) {
    console.log({whitespaceRatio})
    let lineLength = Math.floor(textWidth * (1 - whitespaceRatio));
    let i = 0;
    let max = 10000;
    while (text.length > 0 && i++ < max) {
        let line = text.substring(0, lineLength);
        davinci_line(parent, line);
        text = text.substring(lineLength);
        console.log(line.length, {line});
    }
}

function davinci_line(parent, text) {
    const padding_left  = Math.floor((textWidth - text.length) / 2);
    const padding_right = Math.ceil((textWidth - text.length) / 2);
    // console.log({textWidth, padding_left, padding_right, text}, text.length)
    

    let left_span = document.createElement("span");
    left_span.classList.add("back");
    let right_span = document.createElement("span");
    right_span.classList.add("back");

    parent.appendChild(left_span);
    mirrorTextLiteral(left_span, padding_left);
    let middle_span = document.createElement("span");
    middle_span.innerHTML = text;
    parent.appendChild(middle_span);
    parent.appendChild(right_span);
    mirrorTextLiteral(right_span, padding_right);
}

function retype_projects() {
    caclulate_stuffs();
    davinci_block("filler1", 0, .25, 'projects');
    davinci_block("filler2", 0, .5,  'alex calderwood');
    davinci_block("filler3", 0, .75, 'bio');
    davinci_block("filler4", 0, .325,'blog');
    let body = document.querySelector('body');
    post(body, 'ada', 'ada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada adaada ada ada ada');
}

function retype_post() {
    caclulate_stuffs();
    davinci_block("filler1", 0, .25, 'projects');
    davinci_block("filler2", 0, .5,  'alex calderwood');
    davinci_block("filler3", 0, .75, 'bio');
    davinci_block("filler4", 0, .325,'blog');
    let body = document.querySelector('body');
    let title_node = document.querySelector('#title');
    let title = title_node.innerHTML;
    title_node.innerHTML = '';
    let content_node = document.querySelector('#content');
    let content = content_node.innerHTML;
    content_node.innerHTML = '';
    post(content_node, title, content);
}

function retype_blog() {
    caclulate_stuffs();
    davinci_block("filler1", 0.5, .5,  'coming soon');
    mirrorText("filler5a", 1, 1, 0);
}

function retype_main() {
    caclulate_stuffs();
    davinci_block("filler1", 0.2, .3, 'projects');
    davinci_block("filler2", 0.2, .5, 'alex calderwood');
    davinci_block("filler3", 0.2, .7, 'bio');
    davinci_block("filler4", 0.2, .3, 'blog');
    mirrorText("filler5a", 1, 1, 0);
}

caclulate_stuffs();
