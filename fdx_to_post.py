from xml.etree import ElementTree as ET
import sys

def parse_line(line):
    line_content = line.find('Text')
    if line_content is None or line_content.text is None:
        for child in line:
            parse_line(child)
        return

    line_content = line_content.text
    line_type = line.get('Type')
    if line_type == "Scene Citation":
        # as long as it's not the first scene heading, add a divider before the new scene
        if lines_out:
            lines_out.append("---")
        tag = "\n"
    elif line_type == "Character" or line_type == "Dialogue":
        tag = "{:dc}"
    elif line_type == "Action" or line_type == "Notations":
        tag = "{:act}"
    elif line_type == "Parenthetical":
        tag = "{:paren}"

    if line_type == "Character" or line_type == "Scene Citation":
        line_content = line_content.upper()
    lines_out.append(line_content)
    lines_out.append(tag)


if len(sys.argv) < 5:
    print("usage: python3 fdx_to_post.py <play file name> <post date> <post title> <post excerpt>")
    sys.exit(1)

fdx = sys.argv[1]
tree = ET.parse(fdx)
root = tree.getroot()
play = root.find('Content')

date = sys.argv[2]
title = sys.argv[3]
excerpt = sys.argv[4]
meta = ["---", "layout: post", "title: {}".format(title), "date: {} 21:15:39 -0800".format(date), "excerpt: {}".format(excerpt), "---"]
presets = ["{:dc: style=\"text-align: center\"}", "{:paren: style=\"text-align: center; font-style: italic;\"}", "{:act: style=\"text-align: right; font-style: italic;\"}"]
lines_out = []

for line in play:
    parse_line(line)

out_file = "_posts/{}-{}.markdown".format(date, title)
with open(out_file, "w") as out:
    out_content = meta + presets + lines_out
    out.write("\n".join(out_content))
