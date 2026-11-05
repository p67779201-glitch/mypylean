// Modules 5 and 6 — functions and mini projects.
export const modulesBuild = [
  {
    id: 'functions',
    title: 'Functions',
    tagline: 'Build your own commands',
    accent: 'pink',
    topics: [
      {
        id: 'def-basics',
        title: 'Define your own command',
        minutes: 5,
        summary: 'Wrap useful code in a name you can reuse.',
        theory: `
          <p>A <strong>function</strong> is a named block of code. You write it once with <code>def</code>, then call it as many times as you like.</p>
          <pre><code>def greet():
    print("Hello, coder!")

greet()
greet()</code></pre>
          <p>Defining a function does not run it. Only the call <code>greet()</code> makes it happen.</p>
          <p>The body is indented, just like an <code>if</code> block.</p>
        `,
        example: { code: 'def cheer():\n    print("You can do it!")\n\ncheer()\ncheer()', note: 'One definition, two calls.' },
        practice: {
          task: 'Define a function called hello that prints Hi, then call it twice.',
          starter: '# define hello below\n',
          solution: 'def hello():\n    print("Hi")\n\nhello()\nhello()',
          expected: 'Hi\nHi',
        },
        quiz: [
          { p: 'Which keyword starts a function?', o: ['def', 'fun', 'function'], a: 0, e: 'Python uses def.' },
          { p: 'What happens when you define a function?', o: ['It runs once', 'Nothing yet', 'It prints its name'], a: 1, e: 'It only runs when called.' },
          { p: 'How do you call a function named start?', o: ['start', 'start()', 'call start'], a: 1, e: 'The brackets make the call.' },
        ],
      },
      {
        id: 'parameters',
        title: 'Parameters',
        minutes: 6,
        summary: 'Hand information into your function.',
        theory: `
          <p>Parameters are the values a function needs to do its job.</p>
          <pre><code>def greet(name):
    print("Hello, " + name)

greet("Pyro")
greet("Sara")</code></pre>
          <p>Two parameters are separated by a comma, and the order you pass them in matters.</p>
          <pre><code>def show(score, level):
    print(level, score)</code></pre>
        `,
        example: { code: 'def banner(word, times):\n    print(word * times)\n\nbanner("-", 12)\nbanner("=", 6)', note: 'Each call can send different values.' },
        practice: {
          task: 'Write a function shout(word) that prints the word in capitals using word + "!". Then shout with hi.',
          starter: '# define shout below\n',
          solution: 'def shout(word):\n    print(word + "!")\n\nshout("hi")',
          expected: 'hi!',
        },
        quiz: [
          { p: 'What are parameters?', o: ['Values a function receives', 'Errors in a function', 'The name of a function'], a: 0, e: 'They are inputs.' },
          { p: 'def add(a, b) — how do you call it with 2 and 3?', o: ['add 2 3', 'add(2, 3)', 'add = 2, 3'], a: 1, e: 'Values go in the brackets in order.' },
          { p: 'How many values can a function take?', o: ['Only one', 'As many as you define', 'Exactly two'], a: 1, e: 'You choose how many parameters to declare.' },
        ],
      },
      {
        id: 'return-values',
        title: 'Return values',
        minutes: 6,
        summary: 'Send an answer back to the caller.',
        theory: `
          <p><code>return</code> hands a value back so you can store or print it.</p>
          <pre><code>def double(n):
    return n * 2

result = double(7)
print(result)</code></pre>
          <p>Once a function returns, it stops. Code after the return never runs.</p>
          <p><code>print()</code> shows something to a human; <code>return</code> gives a value back to the program.</p>
        `,
        example: { code: 'def area(width, height):\n    return width * height\n\nprint(area(3, 4))\nprint(area(5, 2))', note: 'The returned value can be used straight away.' },
        practice: {
          task: 'Write a function square(n) that returns n * n, then print square(6).',
          starter: '# define square below\n',
          solution: 'def square(n):\n    return n * n\n\nprint(square(6))',
          expected: '36',
        },
        quiz: [
          { p: 'What does return do?', o: ['Prints a value', 'Sends a value back', 'Stops the program'], a: 1, e: 'The caller receives the value.' },
          { p: 'After a return runs, what happens to the rest of the function?', o: ['It runs too', 'It is skipped', 'It repeats'], a: 1, e: 'The function ends immediately.' },
          { p: 'def half(n): return n / 2 — what is half(10)?', o: ['5.0', '10', '20'], a: 0, e: '10 divided by 2.' },
        ],
      },
      {
        id: 'combine-functions',
        title: 'Functions working together',
        minutes: 7,
        summary: 'Use one function inside another.',
        theory: `
          <p>Small functions can be combined into bigger ideas.</p>
          <pre><code>def area(w, h):
    return w * h

def cost(w, h, price):
    return area(w, h) * price

print(cost(3, 4, 10))</code></pre>
          <p>Because <code>cost</code> uses <code>area</code>, you only fix a bug in one place. That is the real superpower of functions.</p>
        `,
        example: { code: 'def tax(price):\n    return price * 0.1\n\ndef total(price):\n    return price + tax(price)\n\nprint(total(200))', note: 'tax works on its own and inside total.' },
        practice: {
          task: 'Write area(w, h) returning w * h, then total(w, h, price) returning area(w, h) * price. Print total(3, 4, 10).',
          starter: '# two functions below\n',
          solution: 'def area(w, h):\n    return w * h\n\ndef total(w, h, price):\n    return area(w, h) * price\n\nprint(total(3, 4, 10))',
          expected: '120',
        },
        quiz: [
          { p: 'Can one function call another?', o: ['Yes', 'No', 'Only in loops'], a: 0, e: 'That is how bigger programs are built.' },
          { p: 'Why keep functions small?', o: ['Easier to reuse and fix', 'Python requires it', 'To use less memory'], a: 0, e: 'Small pieces are easier to reason about.' },
          { p: 'If area(2, 5) returns 10 and price is 3, what is total?', o: ['13', '30', '10'], a: 1, e: '10 × 3 = 30.' },
        ],
      },
    ],
  },
  {
    id: 'projects',
    title: 'Mini Projects',
    tagline: 'Put everything together',
    accent: 'emerald',
    topics: [
      {
        id: 'project-average',
        title: 'Score keeper',
        minutes: 8,
        summary: 'Average a list of scores with a function.',
        theory: `
          <p>Combine lists, loops and functions to find an average.</p>
          <pre><code>def average(nums):
    total = 0
    for n in nums:
        total = total + n
    return total / len(nums)

print(average([8, 6, 10]))</code></pre>
          <p>The loop adds everything up, then we divide by how many items there were.</p>
        `,
        example: { code: 'def average(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total / len(nums)\n\nprint(average([10, 20, 30]))', note: 'Careful with an empty list — len would be 0.' },
        practice: {
          task: 'With scores = [8, 6, 10], loop to sum them into total, then print total / len(scores).',
          starter: 'scores = [8, 6, 10]\ntotal = 0\n# loop and print the average\n',
          solution: 'scores = [8, 6, 10]\ntotal = 0\nfor s in scores:\n    total = total + s\nprint(total / len(scores))',
          expected: '8.0',
        },
        quiz: [
          { p: 'How do you find an average?', o: ['Total divided by count', 'Total times count', 'Biggest minus smallest'], a: 0, e: 'Sum then divide.' },
          { p: 'What does len([3, 3, 3]) give?', o: ['9', '3', '1'], a: 1, e: 'Three items.' },
          { p: 'Which value starts a sum correctly?', o: ['0', '1', 'None'], a: 0, e: 'Zero keeps the total right.' },
        ],
      },
      {
        id: 'project-pattern',
        title: 'Star painter',
        minutes: 8,
        summary: 'Draw a growing shape with nested loops.',
        theory: `
          <p>Nested loops plus string repetition make patterns.</p>
          <pre><code>for row in range(4):
    print("*" * (row + 1))</code></pre>
          <p>Row 0 prints one star, row 3 prints four. To flip the triangle upside down, count backwards: <code>range(4, 0, -1)</code>.</p>
        `,
        example: { code: 'for row in range(4, 0, -1):\n    print("*" * row)', note: 'A loop can count down too.' },
        practice: {
          task: 'Print a triangle of stars: 1 star, then 2, then 3, then 4.',
          starter: '# triangle below\n',
          solution: 'for row in range(1, 5):\n    print("*" * row)',
          expected: '*\n**\n***\n****',
        },
        quiz: [
          { p: 'What does "*" * 3 give?', o: ['***', '* * *', 'an error'], a: 0, e: 'Repetition joins copies together.' },
          { p: 'How do you count down in a loop?', o: ['range(4, 0, -1)', 'range(0, 4)', 'range(-4)'], a: 0, e: 'A negative step counts backwards.' },
          { p: 'Inside a loop, what changes each row?', o: ['The loop variable', 'The print command', 'Nothing'], a: 0, e: 'The loop variable grows or shrinks.' },
        ],
      },
      {
        id: 'project-table',
        title: 'Times-table machine',
        minutes: 8,
        summary: 'Print a whole times table from one number.',
        theory: `
          <p>A function that loops and prints makes a reusable tool.</p>
          <pre><code>def table(n):
    for i in range(1, 6):
        print(n * i)

table(3)</code></pre>
          <p>Because the number is a parameter, you can print any table with the same function.</p>
        `,
        example: { code: 'def table(n):\n    for i in range(1, 4):\n        print(n, "x", i, "=", n * i)\n\ntable(2)', note: 'Commas keep the output readable.' },
        practice: {
          task: 'Write a function table(n) that prints n times 1 up to n times 5. Then call table(3).',
          starter: '# define table below\n',
          solution: 'def table(n):\n    for i in range(1, 6):\n        print(n * i)\n\ntable(3)',
          expected: '3\n6\n9\n12\n15',
        },
        quiz: [
          { p: 'What is the last value i takes in range(1, 6)?', o: ['5', '6', '1'], a: 0, e: 'The stop value is not included.' },
          { p: 'Why pass n as a parameter?', o: ['So one function handles any number', 'Python requires it', 'To make it slower'], a: 0, e: 'Parameters make code reusable.' },
          { p: 'What does 4 * 5 give?', o: ['9', '20', '45'], a: 1, e: 'Four groups of five.' },
        ],
      },
      {
        id: 'project-counter',
        title: 'Letter counter',
        minutes: 8,
        summary: 'Count characters across a list of words.',
        theory: `
          <p>Loops can count almost anything — letters, points, mistakes.</p>
          <pre><code>words = ["hi", "there"]
total = 0
for w in words:
    total = total + len(w)
print(total)</code></pre>
          <p>This is the same "start at zero and add" pattern you already know, applied to text.</p>
        `,
        example: { code: 'words = ["code", "is", "fun"]\nlongest = words[0]\nfor w in words:\n    if len(w) > len(longest):\n        longest = w\nprint(longest)', note: 'Compare lengths to find the longest word.' },
        practice: {
          task: 'With words = ["hi", "there", "code"], count the total number of letters and print it.',
          starter: 'words = ["hi", "there", "code"]\ntotal = 0\n# loop and print\n',
          solution: 'words = ["hi", "there", "code"]\ntotal = 0\nfor w in words:\n    total = total + len(w)\nprint(total)',
          expected: '11',
        },
        quiz: [
          { p: 'What does len("there") give?', o: ['4', '5', '6'], a: 1, e: 't-h-e-r-e is five letters.' },
          { p: 'Why start total at 0?', o: ['So the sum is correct', 'Because Python needs it', 'To avoid errors'], a: 0, e: 'Adding to zero keeps the true total.' },
          { p: 'Which pattern counts items in a list?', o: ['A loop with a counter', 'A single print', 'An if statement alone'], a: 0, e: 'Loops visit every item.' },
        ],
      },
    ],
  },
];