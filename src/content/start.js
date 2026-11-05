// Modules 1 and 2 — first steps in Python and making decisions.
export const modulesStart = [
  {
    id: 'hello',
    title: 'Hello, Python',
    tagline: 'Say your first words to the computer',
    accent: 'lime',
    topics: [
      {
        id: 'print-basics',
        title: 'Say hello with print()',
        minutes: 4,
        summary: 'Send your first message to the screen.',
        theory: `
          <p><strong>print()</strong> is how Python talks. Whatever you put inside the brackets shows up on the screen.</p>
          <pre><code>print("Hello, world!")</code></pre>
          <p>Text has to sit inside quotes — single <code>'...'</code> or double <code>"..."</code> both work. The quotes are the wrapper, not part of the message.</p>
          <h3>Every print starts a new line</h3>
          <pre><code>print("My name is Pyro")
print("I love code")</code></pre>
          <p>Two prints, two lines. That is all there is to it.</p>
        `,
        example: { code: 'print("Hello, world!")\nprint("Python is fun")', note: 'Run it and watch two lines appear.' },
        practice: {
          task: 'Print two lines. The first one says Hello! and the second says I am learning Python.',
          starter: '# Print your first line below\n',
          solution: 'print("Hello!")\nprint("I am learning Python")',
          expected: 'Hello!\nI am learning Python',
        },
        quiz: [
          { p: 'Which line prints exactly: Hello?', o: ['print(Hello)', 'print("Hello")', 'print "Hello"'], a: 1, e: 'Text needs quotes inside the brackets.' },
          { p: 'How many lines does this show?\nprint("a")\nprint("b")', o: ['1 line', '2 lines', '4 lines'], a: 1, e: 'Each print() makes its own line.' },
          { p: 'What appears on screen for print("7")?', o: ['7', '"7"', 'nothing'], a: 0, e: 'The quotes only mark the text — they are not printed.' },
        ],
      },
      {
        id: 'variables',
        title: 'Variables',
        minutes: 5,
        summary: 'Store values in labelled boxes you can reuse.',
        theory: `
          <p>A <strong>variable</strong> is a labelled box. You put a value inside, then use the label to get it back.</p>
          <pre><code>score = 10
print(score)</code></pre>
          <p>The <code>=</code> sign means "store this". It is not a question to solve.</p>
          <h3>Change it whenever you like</h3>
          <pre><code>lives = 3
lives = lives - 1
print(lives)</code></pre>
          <p>Python reads the right side first, then puts the answer in the box.</p>
          <p>Names can use letters, numbers and underscores, but cannot start with a number and cannot contain spaces.</p>
        `,
        example: { code: 'hero = "Pyro"\nscore = 10\nscore = score + 5\nprint(hero, score)', note: 'The comma in print() adds a space between values.' },
        practice: {
          task: 'Create a variable called age holding 12, then print the message: I am 12',
          starter: '# Create age below, then print it\n',
          solution: 'age = 12\nprint("I am", age)',
          expected: 'I am 12',
        },
        quiz: [
          { p: 'Which line creates a variable called score holding 5?', o: ['score = 5', '5 = score', 'var score = 5'], a: 0, e: 'The name comes first, then =, then the value.' },
          { p: 'x = 3, then x = x + 4. What is x now?', o: ['3', '4', '7'], a: 2, e: 'It takes the old 3, adds 4, and stores 7.' },
          { p: 'Which name is allowed in Python?', o: ['2nd_player', 'player_2', 'player-2'], a: 1, e: 'No leading numbers and no dashes.' },
        ],
      },
      {
        id: 'strings',
        title: 'Text and quotes',
        minutes: 5,
        summary: 'Join text together and measure it.',
        theory: `
          <p>Text in Python is called a <strong>string</strong>. A string can be joined with <code>+</code> and repeated with <code>*</code>.</p>
          <pre><code>first = "Py"
second = "ro"
print(first + second)</code></pre>
          <p><code>len()</code> counts the characters in a string.</p>
          <pre><code>print(len("python"))</code></pre>
          <p>Repeating a string is handy for lines and shapes.</p>
          <pre><code>print("-" * 10)</code></pre>
        `,
        example: { code: 'name = "Pyro"\nprint("Hello, " + name)\nprint(len(name))', note: 'Spaces matter — "Hello, " keeps the space before the name.' },
        practice: {
          task: 'Without typing the full word, print ha four times in one line using the * operator.',
          starter: '# Use "ha" * something\n',
          solution: 'print("ha" * 4)',
          expected: 'hahahaha',
        },
        quiz: [
          { p: 'What does len("python") give?', o: ['5', '6', '7'], a: 1, e: 'p-y-t-h-o-n is six characters.' },
          { p: 'What does "ab" + "cd" make?', o: ['abcd', 'ab cd', 'an error'], a: 0, e: '+ glues the strings together with no space.' },
          { p: 'What does "go" * 2 print?', o: ['gogo', 'go go', 'go2'], a: 0, e: 'Repeating adds the same string again.' },
        ],
      },
      {
        id: 'numbers',
        title: 'Numbers and maths',
        minutes: 6,
        summary: 'Add, divide, and find remainders.',
        theory: `
          <p>Python is a very fast calculator.</p>
          <pre><code>print(7 + 3)
print(7 - 3)
print(7 * 3)</code></pre>
          <h3>Two kinds of division</h3>
          <p><code>/</code> gives the exact answer, <code>//</code> throws away the decimal part, and <code>%</code> gives what is left over.</p>
          <pre><code>print(7 / 2)
print(7 // 2)
print(7 % 2)</code></pre>
          <p>Brackets work like in maths class: <code>print((2 + 3) * 4)</code> is 20.</p>
        `,
        example: { code: 'print((2 + 3) * 4)\nprint(9 // 2)\nprint(9 % 2)', note: 'Brackets first, then multiply, then add.' },
        practice: {
          task: 'Print 12 divided by 4 the decimal way, then 12 divided by 4 the whole-number way.',
          starter: '# Line 1: decimal division\n# Line 2: whole-number division\n',
          solution: 'print(12 / 4)\nprint(12 // 4)',
          expected: '3.0\n3',
        },
        quiz: [
          { p: 'What is 7 // 2?', o: ['3', '3.5', '4'], a: 0, e: '// keeps only the whole part.' },
          { p: 'What is 7 % 2?', o: ['1', '2', '3'], a: 0, e: 'Two fits into seven three times, with one left over.' },
          { p: 'In Python, 10 / 4 gives…', o: ['2', '2.5', '2.4'], a: 1, e: '/ always gives the exact decimal answer.' },
        ],
      },
    ],
  },
  {
    id: 'decisions',
    title: 'Making Decisions',
    tagline: 'Teach Python how to choose',
    accent: 'cyan',
    topics: [
      {
        id: 'comparing',
        title: 'Comparing values',
        minutes: 5,
        summary: 'Ask questions that answer True or False.',
        theory: `
          <p>A comparison answers a yes/no question. Python says <code>True</code> or <code>False</code> — capital letters, no quotes.</p>
          <pre><code>print(5 > 3)
print(5 == 5)
print(5 != 5)</code></pre>
          <p>Notice the double equals: <code>==</code> asks "are these equal?", while <code>=</code> stores a value.</p>
          <h3>The full set</h3>
          <p><code>==</code> equal, <code>!=</code> not equal, <code>&lt;</code> smaller, <code>&gt;</code> bigger, <code>&lt;=</code> smaller or equal, <code>&gt;=</code> bigger or equal.</p>
        `,
        example: { code: 'score = 42\nprint(score > 40)\nprint(score == 42)\nprint(score < 10)', note: 'The last line prints False.' },
        practice: {
          task: 'Set score = 90, then print whether it is bigger than 50 and whether it equals 100.',
          starter: 'score = 90\n# Print two comparisons\n',
          solution: 'score = 90\nprint(score > 50)\nprint(score == 100)',
          expected: 'True\nFalse',
        },
        quiz: [
          { p: 'Which asks "is a equal to b"?', o: ['a = b', 'a == b', 'a != b'], a: 1, e: 'Double equals compares, single equals stores.' },
          { p: 'What does print(3 >= 3) show?', o: ['True', 'False', '3'], a: 0, e: '>= includes being equal.' },
          { p: 'What does print("a" == "A") show?', o: ['True', 'False', 'an error'], a: 1, e: 'Capital letters count as different characters.' },
        ],
      },
      {
        id: 'if-basics',
        title: 'if statements',
        minutes: 6,
        summary: 'Run code only when something is true.',
        theory: `
          <p>An <code>if</code> statement runs its block only when the condition is true.</p>
          <pre><code>score = 72
if score >= 50:
    print("You passed!")</code></pre>
          <h3>Indentation is the block</h3>
          <p>The four spaces under the <code>if</code> line are not decoration — they are how Python knows which lines belong to it. Remove them and Python complains.</p>
          <p>The line ends with a colon <code>:</code>. Forget it and Python complains too.</p>
        `,
        example: { code: 'lives = 0\nif lives == 0:\n    print("Game over")', note: 'Because the condition is true, the message appears.' },
        practice: {
          task: 'With score = 72, print Pass only if score is at least 50.',
          starter: 'score = 72\n# Add an if statement\n',
          solution: 'score = 72\nif score >= 50:\n    print("Pass")',
          expected: 'Pass',
        },
        quiz: [
          { p: 'What must go at the end of an if line?', o: ['a semicolon ;', 'a colon :', 'a bracket )'], a: 1, e: 'if conditions end with a colon.' },
          { p: 'What tells Python which lines belong to the if?', o: ['Indentation', 'Quotes', 'Brackets'], a: 0, e: 'The spaces are part of the syntax.' },
          { p: 'x = 3\nif x > 5:\n    print("big")\nWhat prints?', o: ['big', 'nothing', 'an error'], a: 1, e: 'The condition is false, so the block is skipped.' },
        ],
      },
      {
        id: 'else-elif',
        title: 'else and elif',
        minutes: 6,
        summary: 'Handle the other cases too.',
        theory: `
          <p><code>else</code> runs when the <code>if</code> was false. <code>elif</code> (else-if) checks another condition first.</p>
          <pre><code>score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("Keep practising")</code></pre>
          <p>Python checks from the top and stops at the first match. That is why the order of your conditions matters.</p>
        `,
        example: { code: 'age = 10\nif age < 5:\n    print("Toddler")\nelif age < 13:\n    print("Child")\nelse:\n    print("Teen or older")', note: 'Only one branch ever runs.' },
        practice: {
          task: 'With score = 85, print A for 90 or more, B for 80 or more, and C for anything else.',
          starter: 'score = 85\n# if / elif / else here\n',
          solution: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
          expected: 'B',
        },
        quiz: [
          { p: 'How many branches run in an if/elif/else chain?', o: ['Exactly one', 'All of them', 'None'], a: 0, e: 'Python stops at the first true condition.' },
          { p: 'Which keyword is short for "else if"?', o: ['elseif', 'elif', 'otherwise'], a: 1, e: 'Python writes it as elif.' },
          { p: 'if x > 10: A\nelif x > 5: B\nelse: C\nWith x = 7, what runs?', o: ['A', 'B', 'C'], a: 1, e: '7 is not above 10, but it is above 5.' },
        ],
      },
      {
        id: 'logic',
        title: 'and, or, not',
        minutes: 6,
        summary: 'Combine conditions into one bigger question.',
        theory: `
          <p>Use <code>and</code> when both things must be true, <code>or</code> when one is enough, and <code>not</code> to flip an answer.</p>
          <pre><code>age = 10
ticket = True
if age >= 8 and ticket:
    print("Come in!")</code></pre>
          <h3>Short and readable</h3>
          <p>Instead of <code>ticket == True</code> you can simply write <code>if ticket:</code>. For false, write <code>if not ticket:</code>.</p>
        `,
        example: { code: 'raining = False\ncoat = True\nif raining or coat:\n    print("You are ready")', note: 'or only needs one side to be true.' },
        practice: {
          task: 'With age = 10 and has_ticket = True, print You can enter when age is at least 8 AND they have a ticket.',
          starter: 'age = 10\nhas_ticket = True\n# Your if statement\n',
          solution: 'age = 10\nhas_ticket = True\nif age >= 8 and has_ticket:\n    print("You can enter")',
          expected: 'You can enter',
        },
        quiz: [
          { p: 'When is a and b true?', o: ['When both are true', 'When either is true', 'When both are false'], a: 0, e: 'and needs both sides.' },
          { p: 'When is a or b true?', o: ['Only when both are true', 'When at least one is true', 'Never'], a: 1, e: 'or is happy with one side.' },
          { p: 'What does not True give?', o: ['True', 'False', 'None'], a: 1, e: 'not flips the answer.' },
        ],
      },
    ],
  },
];