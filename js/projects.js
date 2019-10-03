var lineNum = 0;
var noPrompt = [0, 2];
var text = [
    "`glimmer train, august 2018: waiting for fireworks - <a href='http://www.glimmertrain.com/pages/gts_single_issues.php'>issue 103</a> <br\>" +
    "glimmer train, january 2018: a constitution for a young artist - <a href='http://www.glimmertrain.com/bulletins/essays/b132beaudan.php'>essay</a>`",
    "for project in coursework[favorites]: print('{0}: {1} - {2}'.format(project.title, project.brief, project.description_link)) # can't publish solutions to academic projects, can only link project specifications",
    "`<p style='text-decoration:underline'>reinforcement learning</p>: implementing value iteration and q-learning for pacman/crawler agents - <a href=\"https://inst.eecs.berkeley.edu/~cs188/sp19/project3.html\">spec</a> <br>" +
    "<p style='text-decoration:underline'>cpu</p>: building a 32-bit, 2-stage pipelined risc-v cpu in logisim - <a href='http://inst.eecs.berkeley.edu/~cs61c/fa18/projs/03-2/'>spec</a> <br>" +
    "<p style='text-decoration:underline'>alu</p>: building a 32-bit alu and reg-file in logisim - <a href='http://inst.eecs.berkeley.edu/~cs61c/fa18/projs/03-1/'>spec</a> <br>" +
    "<p style='text-decoration:underline'>depth maps</p>: building depth maps from stereo images - <a href='http://inst.eecs.berkeley.edu/~cs61c/fa18/projs/01/'>spec</a> <br>" +
    "<p style='text-decoration:underline'>subset compatibility</p>: designing and implementing an approximation algorithm for an np-complete problem (breaking a graph into k compatible subsets of size no more than s [compatibility defined in spec]) - <a href='https://d1b10bmlvqabco.cloudfront.net/attach/jhadltur59wtu/idril7rumak4d3/jocsqsxf370/CS_170_FA18_Project_Spec.pdf'>spec</a> <br>" +
    "<p style='text-decoration:underline'>bear maps</p>: implementing image stitching and a* search to build a simplified version of google maps for the berkeley area - <a href='https://sp18.datastructur.es/materials/proj/proj3/proj3'>spec</a> <br>" +
    "<p style='text-decoration:underline'>percolation</p>: using disjoint sets to model percolation via monte carlo simulation - <a href='https://sp18.datastructur.es/materials/hw/hw2/hw2'>spec</a> <br>" +
    "<p style='text-decoration:underline'>game</p>: designing and implementing a crawler game with random world generation - <a href='https://sp18.datastructur.es/materials/proj/proj2/proj2'>spec</a> <br>" +
    "<p style='text-decoration:underline'>nbody</p>: physics simulator (introductory) - <a href='https://sp18.datastructur.es/materials/proj/proj0/proj0'>spec</a>  <br>" +
    "<p style='text-decoration:underline'>scheme</p>: implementing an interpreter for the scheme programming language - <a href='http://inst.eecs.berkeley.edu/~cs61a/fa17/proj/scheme/'>spec</a>" +
    "`"
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
