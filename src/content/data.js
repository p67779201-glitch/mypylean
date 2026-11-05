// Modules 7 and 8 — collections and the habits of real Python code.
export const modulesData = [
  {
    id: 'collections',
    title: 'Collections',
    tagline: 'Many values, one name',
    accent: 'cyan',
    topics: [
      {
        id: 'list-methods',
        title: 'Lists that change',
        minutes: 7,
        summary: 'Add, remove and count items in a list.',
        theory: `
          <p>A list keeps values in order. Methods change the list in place — no reassignment needed.</p>
          <pre><code>fruits = ["apple", "pear"]
fruits.append("fig")
fruits.remove("pear")
print(fruits)
print(len(fruits))</code></pre>
          <p><code>append</code> adds to the end, <code>remove</code> takes a value out by name, <code>len</code> counts what is left.</p>
          <h3>Three more worth knowing</h3>
          <ul>
            <li><code>insert(0, x)</code> — add at a position.</li>
            <li><code>pop()</code> — remove and return the last item.</li>
            <li><code>sort()</code> — put the list in order.</li>
          </ul>
          <p>Careful: <code>remove</code> needs the value, <code>pop</code> needs the position.</p>
        `,
        example: {
          code: 'scores = [7, 9, 4]\nscores.append(10)\nscores.sort()\nprint(scores)\nprint(scores.pop())',
          note: 'sort() orders the list, pop() hands back the largest value.',
        },
        practice: {
          task: 'Start with fruits = ["apple"], add "pear" to the end, then print the whole list.',
          starter: 'fruits = ["apple"]\n# add pear and print\n',
          solution: 'fruits = ["apple"]\nfruits.append("pear")\nprint(fruits)',
          expected: "['apple', 'pear']",
        },
        quiz: [
          { p: 'Which method adds an item to the end of a list?', o: ['append', 'add', 'push'], a: 0, e: 'append is the list method.' },
          { p: 'What does len([1, 2, 3]) give?', o: ['3', '2', '6'], a: 0, e: 'Three items.' },
          { p: 'How do you remove the value 5 from a list?', o: ['list.remove(5)', 'list.remove[5]', 'list - 5'], a: 0, e: 'remove takes the value in brackets.' },
        ],
      },
      {
        id: 'dictionaries',
        title: 'Dictionaries',
        minutes: 8,
        summary: 'Store values under labels instead of positions.',
        theory: `
          <p>A dictionary maps a <strong>key</strong> to a <strong>value</strong>. Keys are usually words, so you look things up by meaning instead of by number.</p>
          <pre><code>ages = {"ali": 21, "sara": 19}
print(ages["sara"])
ages["omar"] = 24
print(ages)</code></pre>
          <p>Add a new pair simply by assigning a key. Reading a key that does not exist raises a <code>KeyError</code>, so <code>ages.get("zara")</code> is the safe lookup — it returns <code>None</code> instead of crashing.</p>
          <h3>Why they matter</h3>
          <p>Lists answer "what is at position 3?". Dictionaries answer "what is the value for this name?" — that is most of what real programs need.</p>
        `,
        example: {
          code: 'stock = {"pens": 12, "pads": 4}\nstock["pens"] = stock["pens"] + 3\nprint(stock)\nprint(stock.get("erasers", 0))',
          note: 'Update a value directly, and look up safely with get.',
        },
        practice: {
          task: 'Build ages with ali at 21 and sara at 19, then print the value for sara.',
          starter: 'ages = {"ali": 21, "sara": 19}\n# print the value for sara\n',
          solution: 'ages = {"ali": 21, "sara": 19}\nprint(ages["sara"])',
          expected: '19',
        },
        quiz: [
          { p: 'What is a key in a dictionary?', o: ['The label you look up', 'The position in the list', 'The length'], a: 0, e: 'Keys name the values.' },
          { p: 'How do you read the value for "ali"?', o: ['ages["ali"]', 'ages.ali', 'ages(1)'], a: 0, e: 'Keys go in square brackets.' },
          { p: 'What does get() do for a missing key?', o: ['Returns None or your default', 'Crashes', 'Creates a list'], a: 0, e: 'That is why it is the safe lookup.' },
        ],
      },
      {
        id: 'dict-loop',
        title: 'Looping a dictionary',
        minutes: 7,
        summary: 'Walk every key and value in one loop.',
        theory: `
          <p><code>.items()</code> gives you both the key and the value at once, so you can unpack them into two names.</p>
          <pre><code>prices = {"pen": 2, "book": 5}
total = 0
for name, price in prices.items():
    print(name, "costs", price)
    total = total + price
print(total)</code></pre>
          <p>Use <code>.keys()</code> when you only need the labels and <code>.values()</code> when you only need the numbers. <code>.items()</code> is the one you will use most.</p>
          <p>Notice the same "start at zero" counting pattern from earlier lessons — it works on dictionary values too.</p>
        `,
        example: {
          code: 'votes = {"yes": 7, "no": 3}\nfor choice, count in votes.items():\n    print(choice, count)',
          note: 'Two names, two pieces of every pair.',
        },
        practice: {
          task: 'With prices = {"pen": 2, "book": 5}, loop over the items and add each price to total, then print total.',
          starter: 'prices = {"pen": 2, "book": 5}\ntotal = 0\n# loop and print the total\n',
          solution: 'prices = {"pen": 2, "book": 5}\ntotal = 0\nfor name, price in prices.items():\n    total = total + price\nprint(total)',
          expected: '7',
        },
        quiz: [
          { p: 'What does .items() give you?', o: ['Key and value pairs', 'Only keys', 'Only values'], a: 0, e: 'Pairs you can unpack.' },
          { p: 'Which loop line unpacks a pair?', o: ['for k, v in d.items():', 'for d in items:', 'for k in d.items():'], a: 0, e: 'Two names for two parts.' },
          { p: 'If prices has 2 and 5, what is the total?', o: ['7', '25', '2'], a: 0, e: 'Add the values.' },
        ],
      },
      {
        id: 'tuples-sets',
        title: 'Tuples and sets',
        minutes: 6,
        summary: 'Two more containers, each with one job.',
        theory: `
          <p>A <strong>tuple</strong> is a list you cannot change. Parentheses instead of brackets.</p>
          <pre><code>point = (3, 5)
print(point[0])</code></pre>
          <p>A <strong>set</strong> is a collection with no duplicates and no order. Use braces, or wrap a list in <code>set()</code>.</p>
          <pre><code>tags = {"python", "code", "python"}
print(tags)
print(len(set([1, 2, 2, 3])))</code></pre>
          <p>Reach for a set the moment you need to remove duplicates — that is its whole purpose.</p>
        `,
        example: {
          code: 'names = ["ali", "sara", "ali"]\nunique = set(names)\nprint(unique)\nprint(len(unique))',
          note: 'Two people, three entries.',
        },
        practice: {
          task: 'Print how many unique values are in [1, 2, 2, 3] using set() and len().',
          starter: 'values = [1, 2, 2, 3]\n# print the number of unique values\n',
          solution: 'values = [1, 2, 2, 3]\nprint(len(set(values)))',
          expected: '3',
        },
        quiz: [
          { p: 'Can you change a tuple after creating it?', o: ['No', 'Yes, any time', 'Only its last item'], a: 0, e: 'Tuples are fixed.' },
          { p: 'What does a set remove automatically?', o: ['Duplicates', 'Strings', 'Order of the code'], a: 0, e: 'Sets hold only unique values.' },
          { p: 'len(set([1, 1, 1])) is…', o: ['1', '3', '0'], a: 0, e: 'One unique value.' },
        ],
      },
    ],
  },
  {
    id: 'real-python',
    title: 'Real Python',
    tagline: 'Readable code, fewer crashes',
    accent: 'violet',
    topics: [
      {
        id: 'f-strings',
        title: 'f-strings',
        minutes: 5,
        summary: 'Put values inside text without messy plus signs.',
        theory: `
          <p>Add <code>f</code> before the quotes and put variables straight into braces.</p>
          <pre><code>name = "Ali"
age = 20
print(f"{name} is {age}")</code></pre>
          <p>That is shorter and easier to read than <code>name + " is " + str(age)</code>, and you never have to convert numbers yourself.</p>
          <p>You can also format inside the braces: <code>f"{price:.2f}</code> gives two decimal places.</p>
        `,
        example: {
          code: 'item = "coffee"\nprice = 4\nprint(f"One {item} costs {price} dollars")',
          note: 'Any expression can live inside the braces.',
        },
        practice: {
          task: 'With name = "Ali" and age = 20, print "Ali is 20" using one f-string.',
          starter: 'name = "Ali"\nage = 20\n# print with an f-string\n',
          solution: 'name = "Ali"\nage = 20\nprint(f"{name} is {age}")',
          expected: 'Ali is 20',
        },
        quiz: [
          { p: 'What letter goes before an f-string?', o: ['f', 's', 'x'], a: 0, e: 'f turns it into a format string.' },
          { p: 'How do you insert a variable into an f-string?', o: ['{variable}', '[variable]', '(variable)'], a: 0, e: 'Braces hold the value.' },
          { p: 'Do you need str() around a number in an f-string?', o: ['No', 'Yes, always', 'Only for floats'], a: 0, e: 'Python converts it for you.' },
        ],
      },
      {
        id: 'string-methods',
        title: 'String methods',
        minutes: 6,
        summary: 'Clean, split and reshape text.',
        theory: `
          <p>Strings carry their own tools. None of them change the original — they hand back a new string.</p>
          <pre><code>text = "  Hello World  "
print(text.strip())
print(text.strip().lower())
print("a,b,c".split(","))</code></pre>
          <ul>
            <li><code>strip()</code> removes spaces at both ends.</li>
            <li><code>lower()</code> / <code>upper()</code> change case.</li>
            <li><code>title()</code> capitalises each word.</li>
            <li><code>split(sep)</code> turns text into a list.</li>
            <li><code>replace(a, b)</code> swaps pieces of text.</li>
          </ul>
        `,
        example: {
          code: 'line = "  python is fun  "\nclean = line.strip()\nprint(clean.title())\nprint(clean.split())',
          note: 'Chain methods to clean and reshape in one go.',
        },
        practice: {
          task: 'Print " hello world " stripped of spaces and in title case — the result should be Hello World.',
          starter: 'text = "  hello world  "\n# strip and title, then print\n',
          solution: 'text = "  hello world  "\nprint(text.strip().title())',
          expected: 'Hello World',
        },
        quiz: [
          { p: 'Which method removes spaces at the ends?', o: ['strip()', 'trim()', 'clean()'], a: 0, e: 'Python calls it strip.' },
          { p: 'What does "a b".split() give?', o: ["['a', 'b']", "'ab'", '2'], a: 0, e: 'split returns a list.' },
          { p: 'Does .upper() change the original string?', o: ['No, it returns a new one', 'Yes, always', 'Only for lists'], a: 0, e: 'Strings never change in place.' },
        ],
      },
      {
        id: 'errors-basics',
        title: 'Reading errors',
        minutes: 7,
        summary: 'Turn red text into a fix.',
        theory: `
          <p>Errors are messages, not insults. Each one names a problem you can fix.</p>
          <ul>
            <li><code>SyntaxError</code> — a missing bracket or colon.</li>
            <li><code>NameError</code> — you used a name that was never created.</li>
            <li><code>TypeError</code> — mixing things that do not combine, like <code>"2" + 2</code>.</li>
            <li><code>ValueError</code> — right type, wrong value, like <code>int("abc")</code>.</li>
            <li><code>IndexError</code> — a position past the end of a list.</li>
          </ul>
          <pre><code>try:
    number = int("abc")
except ValueError:
    print("not a number")</code></pre>
          <p><code>try</code> runs the risky line; <code>except</code> handles the failure so the program keeps going.</p>
        `,
        example: {
          code: 'ages = {"ali": 20}\ntry:\n    print(ages["sara"])\nexcept KeyError:\n    print("no such person")',
          note: 'Handle the specific error you expect.',
        },
        practice: {
          task: 'In a try block convert "abc" with int(), and in except ValueError print "not a number".',
          starter: 'try:\n    int("abc")\nexcept ValueError:\n    # print the message\n',
          solution: 'try:\n    int("abc")\nexcept ValueError:\n    print("not a number")',
          expected: 'not a number',
        },
        quiz: [
          { p: 'Which error appears for a missing colon?', o: ['SyntaxError', 'ValueError', 'KeyError'], a: 0, e: 'The code cannot be parsed.' },
          { p: 'What does except do?', o: ['Handles the failure', 'Repeats the try', 'Stops the program'], a: 0, e: 'It catches the error.' },
          { p: 'int("abc") raises…', o: ['ValueError', 'TypeError', 'IndexError'], a: 0, e: 'The value cannot be converted.' },
        ],
      },
      {
        id: 'project-gradebook',
        title: 'Project: grade book',
        minutes: 9,
        summary: 'Combine a dictionary, a loop and an if.',
        theory: `
          <p>Real programs are just the pieces you already know, joined together.</p>
          <pre><code>scores = {"ali": 80, "sara": 45}
for name, score in scores.items():
    if score >= 50:
        print(name, "pass")
    else:
        print(name, "fail")</code></pre>
          <p>Dictionary for the data, loop to visit everyone, if to decide. Read it top to bottom and it sounds like a sentence — that is what good code feels like.</p>
        `,
        example: {
          code: 'scores = {"ali": 80, "sara": 45, "omar": 50}\nfor name, score in scores.items():\n    print(name, score)',
          note: 'Swap the print for any decision you need.',
        },
        practice: {
          task: 'Loop over scores = {"ali": 80, "sara": 45} and print each name with "pass" when the score is 50 or more, otherwise "fail".',
          starter: 'scores = {"ali": 80, "sara": 45}\n# loop, decide, print\n',
          solution: 'scores = {"ali": 80, "sara": 45}\nfor name, score in scores.items():\n    if score >= 50:\n        print(name, "pass")\n    else:\n        print(name, "fail")',
          expected: 'ali pass\nsara fail',
        },
        quiz: [
          { p: 'How do you read every pair of a dictionary?', o: ['.items()', '.pairs()', 'len()'], a: 0, e: 'items gives key and value.' },
          { p: 'Which comparison means "50 or more"?', o: ['score >= 50', 'score > 50', 'score = 50'], a: 0, e: '>= includes the boundary.' },
          { p: 'What belongs in an else branch?', o: ['What happens otherwise', 'A second loop', 'The same code again'], a: 0, e: 'else covers every other case.' },
        ],
      },
      {
        id: 'project-wordcount',
        title: 'Project: word counter',
        minutes: 9,
        summary: 'Count words, then count repeats.',
        theory: `
          <p><code>split()</code> turns a sentence into a list of words, and a dictionary can count how often each one appears.</p>
          <pre><code>text = "code is fun and code is fast"
words = text.split()
print(len(words))

counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
print(counts)</code></pre>
          <p><code>counts.get(word, 0)</code> means "how many times have I seen this word so far" — zero the first time. Then add one and store it back.</p>
        `,
        example: {
          code: 'text = "a b a"\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)',
          note: 'The counting pattern behind search engines.',
        },
        practice: {
          task: 'Split "code is fun and code is fast" into words and print how many words there are.',
          starter: 'text = "code is fun and code is fast"\n# split and print the number of words\n',
          solution: 'text = "code is fun and code is fast"\nwords = text.split()\nprint(len(words))',
          expected: '7',
        },
        quiz: [
          { p: 'What does split() do to a sentence?', o: ['Turns it into a list of words', 'Uppercases it', 'Counts letters'], a: 0, e: 'Whitespace separates the words.' },
          { p: 'counts.get(word, 0) returns what for a new word?', o: ['0', '1', 'None'], a: 0, e: 'The default you passed.' },
          { p: 'Why use a dictionary for counting?', o: ['Each word is a key with a count', 'It sorts automatically', 'It removes words'], a: 0, e: 'Keys name, values count.' },
        ],
      },
    ],
  },
];