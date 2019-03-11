var lineNum = 0;
var noPrompt = [6, 8, 10, 12];
var text = [
    "sophomore at the university of california, berkeley",
    "pursuing a b.a. in computer science with a minor in creative writing",
    "software developer experienced in python, java, sql, and c",
    "2017 national youngarts foundation finalist in writing (emphasis on short fiction)",
    "published author and essayist (work appears in glimmer train literary journal)",
    "for course in coursesBrief: print(course)",
    "`math 54: linear algebra and differential equations <br\>" +
    "cs61a: structure and interpretation of computer programs <br\> " +
    "cs61b: data structures <br\> " +
    "cs61c: computer architectures and machine structures <br\> " +
    "cs70: discrete math and probability theory <br\> " +
    "cs170: efficient algorithms and intractable problems <br\>" +
    "cs370: introduction to teaching computer science <br\>" + 
    "cs188: introduction to artificial intelligence<br\>" +
    "eecs127: optimization models in engineering`",            
    "experienceBrief",
    "`{'salesforce' : {'position': 'software developer intern', 'start_time': 'may 2019', 'end_time': 'august 2019'}, <br>" +
    "{'cs370' : {'position': 'peer tutor', 'start_time': 'august 2018', 'end_time': 'december 2018'}, <br\>" +
    "'dahlia lights': {'position': 'software developer intern', 'start_time': 'may 2018', 'end_time': 'august 2018'}}`",
    "headshot",
    "`:) <br>" +
    "(artist's rendering)`",
    "for link in moreDetails: print(link)",
    "`<a href=\"coursework.html\">Coursework</a> <br\>" +
    " <a href=\"experience.html\">Experience</a> <br\>" +
    " <a href=\"writing.html\">Writing</a> <br\>" +
    " <a href=\"contact.html\">Contact</a>`"

];
var idle = false;

var newPrompt = function() {
    // Remove the Typed tag from the previous element.
    var resumeLines = document.getElementsByClassName("resumeText");
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

// Type out the header message -- initializing the 'Python REPL'.
var options = {
    strings: ["python3 -i profile.py"],
    typeSpeed: 40,
    onComplete: () => {
        // Unlock after the initial resume text.
        idle = true;
    }
};
new Typed(".commandLine", options);

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
        line.setAttribute("class", "resumeText");
        var output = document.getElementById("outputText");
        output.appendChild(line);


        new Typed(".resumeText",
            {
                strings: [text[lineNum]],
                typeSpeed: 10,
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
