var lineNum = 0;
var noPrompt = [6, 8];
var text = [
    "sophomore at the university of california, berkeley",
    "pursuing a b.a. in computer science with a minor in creative writing",
    "software developer experienced in python, java, sql, and c",
    "2017 national youngarts foundation finalist in writing (emphasis on short fiction)",
    "published author and essayist (work appears in glimmer train literary journal)",
    "for course in coursework: print(course)",
    "`math 54: linear algebra and differential equations <br>" +
    "cs61a: structure and interpretation of computer programs <br\> " +
    "cs61b: data structures <br> " +
    "cs61c: computer architectures and machine structures <br> " +
    "cs70: discrete math and probability theory <br> " +
    "cs170: efficient algorithms and intractable problems <br>" +
    "cs370: introduction to teaching computer science`",
    "experience:",
    "`{'cs370' : {'position': 'peer tutor', 'start_time': 'August 2018', 'end_time': 'December 2018'}, <br>" +
    "'dahlia lights': {'position': 'software developer intern', 'start_time': 'May 2018', 'end_time': 'August 2018'}}`"
];
var idle = false;
var options = {
    strings: ["python3 -i resume.py"],
    typeSpeed: 40,
    onComplete: () => {
        // Unlock after the initial resume text.
        idle = true;
    }
};
var command = new Typed(".commandLine", options);

document.addEventListener('keypress', function(e){
    if (e.key === 'Enter' && idle) {
        // Remove the Typed tag from the previous element.
        var resumeLines = document.getElementsByClassName("resumeText");
        for (var i = 0; i < resumeLines.length; i++) {
            resumeLines[i].removeAttribute("class");
        }

        if (lineNum >= text.length) {
            return;
        }

        idle = false;
        // Create a new bullet point.
        var line = document.createElement("P");
        line.setAttribute("class", "resumeText");
        var output = document.getElementById("outputText");

        if (!noPrompt.includes(lineNum)) {
            output.appendChild(document.createTextNode(">>> "));
        }

        output.appendChild(line);

        new Typed(".resumeText", { strings: [text[lineNum]], typeSpeed: 10, onComplete: () => { idle = true; }});
        lineNum++;

        // Create a new line.
        output.appendChild(document.createElement("BR"));
    }
});
