import re

regex = "^[a-z -]+\\*? +[/|[|{].+$"

file = open("IELTS Word List.txt", 'r')
word_list = []
for line in file:
    if re.search(regex, line):
        word_list.append(re.search(regex, line).group(0))
file.close()
for word_long in word_list:
    regex = "^[a-z -]+"
    r = re.search(regex, word_long)
    word = r.group(0)
    rest = word_long[len(word):]
    # print(word, " === ", rest)
    regex = '(a.)|(vt.)|(n.)|(v.)|(ad.)|(prep.).+'
    r = re.search(regex, rest)
    if r:
        pron = r.group(0)
    print(pron)

