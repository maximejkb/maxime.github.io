var lineNum = 0;
var noPrompt = [0, 3];
var text = [
    "`glimmer train, august 2018: waiting for fireworks - <a href='http://www.glimmertrain.com/pages/gts_single_issues.php'>issue 103</a> <br\>" +
    "glimmer train, january 2018: a constitution for a young artist - <a href='http://www.glimmertrain.com/bulletins/essays/b132beaudan.php'>essay</a>`",
    ["while novel.status != 'complete': work(novel)", "novel.status = 'in progress'"],
    "for program in notebook: print('{0}, {1}'.format(program.link, program.date))",
    "`<a href=\"./clippings/maze.html\">maze</a>, november 18 <br>" + 
    "<a href=\"https://maximejkb.github.io/graphs/\">graphs</a>, may 13`"
];

var newPrompt = function() {
    // Remove the Typed tag from the previous element.
    var resumeLines = document.getElementsByClassName("writingText");
    for (var i = 0; i < resumeLines.length; i++) {
        resumeLines[i].removeAttribute("class");
    }

    if (!noPrompt.includes(lineNum)) {
        document.querySelectorAll(".typed-cursor")[0].remove();
    }

    var output = document.getElementById("outputText");
    if (!noPrompt.includes(lineNum)) {
        output.appendChild(document.createTextNode(">>> "));
        var cursor = document.createElement("SPAN");
        cursor.appendChild(document.createTextNode("|"));
        cursor.setAttribute("class", "typed-cursor typed-cursor--blink");
        output.appendChild(cursor);
    }
};

var onInteract = function(e) {
    if (((e.type === 'keypress' && e.key === 'Enter') || e.type === 'touchstart') && idle) {
        if (lineNum === 0) {
            newPrompt();
        }

        if (lineNum >= text.length) {
            return;
        }

        idle = false;
        // Remove the placeholder cursor.
        var oldCursor = document.querySelectorAll(".typed-cursor");
        if (oldCursor.length > 0) {
            oldCursor[0].remove();
        }
        // Create a new bullet point.
        var line = document.createElement("P");
        line.setAttribute("class", "writingText");
        var output = document.getElementById("outputText");
        output.appendChild(line);

        var currentText;
        if (text[lineNum].constructor === Array) {
            currentText = text[lineNum];
        } else {
            currentText = [text[lineNum]];
        }

        new Typed(".writingText",
            {
                strings: currentText,
                typeSpeed: 10,
                backSpeed: 10,
                backDelay: 1000,
                onComplete: () => {
                    newPrompt();
                    idle = true;
                }
            });
        lineNum++;

        // Create a new line.
        output.appendChild(document.createElement("BR"));
    }
};

document.addEventListener('keypress', onInteract, false);
document.addEventListener('touchstart', onInteract, false);

var idle = false;

new Typed(".prompt",
    { strings: ["for piece in publications: print('{0}, {1}: {2} - {3}'.format(piece.publication, piece.date, piece.title, piece.link))"],
        typeSpeed: 10,
        onComplete: () => { idle = true; }
    });
