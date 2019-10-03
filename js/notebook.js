var lineNum = 0;
var noPrompt = [0, 2, 4];
var text = [
    "`<a href='../html/culture.html'>cs culture at berkeley</a> - october 3, 2019 <br>" + 
    "<a href='../html/maze.html'>maze</a> - november 18, 2018 <br>" +
    "<a href='../html/structures.html'>data structures</a> - september 20, 2018 <br>" + 
    "<a href='https://maximejkb.github.io/graphs/'>graphs</a> - may 13, 2018`",
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
    { strings: ["for entry in notebook: print('{0} - {1}'.format(entry.title, entry.date))"],
        typeSpeed: 10,
        onComplete: () => { idle = true; }
    });
