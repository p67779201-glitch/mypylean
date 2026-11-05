// Plain-language glossary. Every entry carries a runnable example so the
// playground button always has something sensible to hand over.
export const GLOSSARY_CATEGORIES = ['Basics', 'Data', 'Decisions', 'Loops', 'Functions', 'Errors', 'Tools'];

export const GLOSSARY = [
  // Basics
  {
    term: 'Python',
    category: 'Basics',
    definition: 'A programming language designed to read almost like English. You write a file of instructions and Python runs them top to bottom.',
    code: 'print("Hello from Python")',
  },
  {
    term: 'Statement',
    category: 'Basics',
    definition: 'One instruction on its own line. A program is a list of statements.',
    code: 'name = "Pyro"\nprint(name)',
  },
  {
    term: 'Expression',
    category: 'Basics',
    definition: 'A piece of code that produces a value.',
    code: 'print(2 + 3)\nprint("a" + "b")',
  },
  {
    term: 'Comment',
    category: 'Basics',
    definition: 'Text after a # that Python ignores. It explains code to humans.',
    code: '# this line does nothing\nprint("but this does")',
  },
  {
    term: 'print()',
    category: 'Basics',
    definition: 'Shows a value in the output. It is how your program talks to you.',
    code: 'print("hello")\nprint(7)\nprint("two", "items")',
  },
  {
    term: 'String',
    category: 'Basics',
    definition: 'Text inside quotes. Single and double quotes both work.',
    code: 'a = "double"\nb = \'single\'\nprint(a, b, len(a))',
  },
  {
    term: 'Integer',
    category: 'Basics',
    definition: 'A whole number with no decimal point.',
    code: 'count = 42\nprint(count, count + 8)',
  },
  {
    term: 'Float',
    category: 'Basics',
    definition: 'A number with a decimal point.',
    code: 'price = 3.5\nprint(price * 2)',
  },
  {
    term: 'Boolean',
    category: 'Basics',
    definition: 'A value that is either True or False. Every condition ends up as one.',
    code: 'print(5 > 3)\nprint(bool(0))',
  },
  {
    term: 'Variable',
    category: 'Basics',
    definition: 'A name pointing at a value. Assign with = and use the name later.',
    code: 'score = 10\nscore = score + 5\nprint(score)',
  },
  {
    term: 'Assignment',
    category: 'Basics',
    definition: 'Storing a value under a name. The = sign means "put this there", not "equals".',
    code: 'x = 3\ny = x\nx = 99\nprint(x, y)',
  },
  {
    term: 'Type',
    category: 'Basics',
    definition: 'What kind of value something is — str, int, float, bool, list, dict. type(x) tells you.',
    code: 'print(type(3))\nprint(type("hi"))\nprint(type([1]))',
  },
  {
    term: 'Type conversion',
    category: 'Basics',
    definition: 'Turning one type into another with int(), float() or str().',
    code: 'print(int("7") + 3)\nprint(str(7) + "3")',
  },
  {
    term: 'f-string',
    category: 'Basics',
    definition: 'A string with f in front so you can drop values into braces.',
    code: 'name = "Ali"\nage = 20\nprint(f"{name} is {age}")',
  },
  {
    term: 'Whitespace',
    category: 'Basics',
    definition: 'Spaces, tabs and new lines. At the start of a line, whitespace decides which block the line belongs to.',
    code: 'if True:\n    print("indented")\nprint("not indented")',
  },
  {
    term: 'Indentation',
    category: 'Basics',
    definition: 'The leading spaces that group lines together. Use four spaces, consistently.',
    code: 'for i in range(2):\n    print("inside", i)',
  },
  {
    term: 'PEP 8',
    category: 'Basics',
    definition: 'The official style guide: lowercase_with_underscores for names, spaces around operators, four-space indents.',
    code: 'total_score = 10  # good\ntotal_score += 5\nprint(total_score)',
  },
  {
    term: 'Immutable',
    category: 'Basics',
    definition: 'A value that cannot be changed after creation. Strings and tuples are immutable — methods return new values.',
    code: 'name = "ali"\nprint(name.upper())\nprint(name)',
  },

  // Data
  {
    term: 'List',
    category: 'Data',
    definition: 'An ordered collection you can change. Square brackets, comma separated.',
    code: 'items = [3, 7, 9]\nprint(items, len(items))',
  },
  {
    term: 'Index',
    category: 'Data',
    definition: 'A position in a sequence, counting from 0. The last item is at -1.',
    code: 'items = ["a", "b", "c"]\nprint(items[0], items[-1])',
  },
  {
    term: 'Slice',
    category: 'Data',
    definition: 'A copy of part of a sequence. The end position is not included.',
    code: 'items = [1, 2, 3, 4]\nprint(items[1:3])\nprint(items[:2])',
  },
  {
    term: 'append()',
    category: 'Data',
    definition: 'Adds one item to the end of a list, changing the list itself.',
    code: 'items = [1, 2]\nitems.append(3)\nprint(items)',
  },
  {
    term: 'remove()',
    category: 'Data',
    definition: 'Deletes the first matching value from a list. Raises ValueError if it is not there.',
    code: 'items = ["a", "b", "a"]\nitems.remove("a")\nprint(items)',
  },
  {
    term: 'pop()',
    category: 'Data',
    definition: 'Removes an item at a position and returns it. Default position is the last item.',
    code: 'items = [1, 2, 3]\nlast = items.pop()\nprint(last, items)',
  },
  {
    term: 'len()',
    category: 'Data',
    definition: 'The number of items in a list, string or dictionary.',
    code: 'print(len([1, 2, 3]))\nprint(len("python"))',
  },
  {
    term: 'sort()',
    category: 'Data',
    definition: 'Puts a list in order, changing it in place. sorted() returns a new list instead.',
    code: 'scores = [9, 4, 7]\nscores.sort()\nprint(scores)\nprint(sorted([3, 1]))',
  },
  {
    term: 'Dictionary',
    category: 'Data',
    definition: 'A collection of key → value pairs, looked up by key instead of position.',
    code: 'ages = {"ali": 21}\nprint(ages["ali"])',
  },
  {
    term: 'Key',
    category: 'Data',
    definition: 'The label used to look a value up in a dictionary. Keys must be unique.',
    code: 'ages = {"ali": 21, "sara": 19}\nprint(list(ages.keys()))',
  },
  {
    term: 'Value',
    category: 'Data',
    definition: 'The thing stored under a dictionary key.',
    code: 'ages = {"ali": 21}\nprint(list(ages.values()))',
  },
  {
    term: 'items()',
    category: 'Data',
    definition: 'Gives key/value pairs from a dictionary so a loop can unpack both.',
    code: 'ages = {"ali": 21, "sara": 19}\nfor name, age in ages.items():\n    print(name, age)',
  },
  {
    term: 'get()',
    category: 'Data',
    definition: 'The safe dictionary lookup: returns a default instead of raising KeyError.',
    code: 'ages = {"ali": 21}\nprint(ages.get("zara", 0))',
  },
  {
    term: 'Tuple',
    category: 'Data',
    definition: 'An ordered, unchangeable collection. Parentheses instead of brackets.',
    code: 'point = (3, 5)\nprint(point[0], point[1])',
  },
  {
    term: 'Set',
    category: 'Data',
    definition: 'An unordered collection with no duplicates. Great for removing repeats.',
    code: 'names = ["ali", "sara", "ali"]\nprint(set(names))',
  },
  {
    term: 'Nested list',
    category: 'Data',
    definition: 'A list inside a list, often used for rows of a table.',
    code: 'grid = [[1, 2], [3, 4]]\nprint(grid[1][0])',
  },
  {
    term: 'Iterable',
    category: 'Data',
    definition: 'Anything a for loop can walk through — a list, string, dictionary or range.',
    code: 'for ch in "abc":\n    print(ch)',
  },

  // Decisions
  {
    term: 'if',
    category: 'Decisions',
    definition: 'Runs a block only when its condition is True.',
    code: 'score = 60\nif score >= 50:\n    print("pass")',
  },
  {
    term: 'elif',
    category: 'Decisions',
    definition: 'Checks another condition when the earlier ones failed. Short for "else if".',
    code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")',
  },
  {
    term: 'else',
    category: 'Decisions',
    definition: 'The block that runs when nothing above matched. It takes no condition.',
    code: 'score = 20\nif score >= 50:\n    print("pass")\nelse:\n    print("try again")',
  },
  {
    term: 'Condition',
    category: 'Decisions',
    definition: 'An expression that evaluates to True or False and decides which block runs.',
    code: 'age = 18\nprint(age >= 18)',
  },
  {
    term: 'Comparison operator',
    category: 'Decisions',
    definition: '== equal, != not equal, <, >, <=, >=. They produce booleans.',
    code: 'print(3 == 3, 3 != 3, 3 >= 4)',
  },
  {
    term: '== vs =',
    category: 'Decisions',
    definition: '== compares two values; = assigns a value to a name. Mixing them up is the classic beginner bug.',
    code: 'a = 5\nprint(a == 5)\nprint(a != 4)',
  },
  {
    term: 'and',
    category: 'Decisions',
    definition: 'True only when both sides are True.',
    code: 'age = 20\nprint(age > 18 and age < 65)',
  },
  {
    term: 'or',
    category: 'Decisions',
    definition: 'True when at least one side is True.',
    code: 'day = "sat"\nprint(day == "sat" or day == "sun")',
  },
  {
    term: 'not',
    category: 'Decisions',
    definition: 'Flips a boolean: not True is False.',
    code: 'logged_in = False\nprint(not logged_in)',
  },
  {
    term: 'Truthiness',
    category: 'Decisions',
    definition: 'Empty things (0, "", [], {}) count as False in a condition. Everything else counts as True.',
    code: 'print(bool(0), bool(""), bool("x"))',
  },
  {
    term: 'Short-circuit',
    category: 'Decisions',
    definition: 'Python stops checking as soon as the answer is known — the right side of and/or may never run.',
    code: 'name = ""\nprint(name or "anonymous")',
  },

  // Loops
  {
    term: 'for loop',
    category: 'Loops',
    definition: 'Visits every item of an iterable, running the body once per item.',
    code: 'for fruit in ["apple", "pear"]:\n    print(fruit)',
  },
  {
    term: 'while loop',
    category: 'Loops',
    definition: 'Repeats while a condition stays True. Something inside must eventually make it False.',
    code: 'count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1',
  },
  {
    term: 'range()',
    category: 'Loops',
    definition: 'Produces numbers from a start up to — but not including — a stop.',
    code: 'for n in range(1, 4):\n    print(n)',
  },
  {
    term: 'Loop variable',
    category: 'Loops',
    definition: 'The name that holds the current item each time around the loop.',
    code: 'for letter in "hi":\n    print(letter)',
  },
  {
    term: 'Nested loop',
    category: 'Loops',
    definition: 'A loop inside another loop. The inner one finishes completely for every outer step.',
    code: 'for row in range(1, 4):\n    for col in range(row):\n        print("*", end="")\n    print()',
  },
  {
    term: 'break',
    category: 'Loops',
    definition: 'Leaves the loop immediately, skipping the remaining items.',
    code: 'for n in range(1, 10):\n    if n == 3:\n        break\n    print(n)',
  },
  {
    term: 'continue',
    category: 'Loops',
    definition: 'Skips the rest of this round and jumps to the next item.',
    code: 'for n in range(1, 5):\n    if n == 2:\n        continue\n    print(n)',
  },
  {
    term: 'Infinite loop',
    category: 'Loops',
    definition: 'A loop whose condition never becomes False. Stop it and check what should change inside.',
    code: 'count = 0\nwhile count < 3:\n    print("round", count)\n    count = count + 1',
  },
  {
    term: 'Accumulator',
    category: 'Loops',
    definition: 'A variable that collects a running result — a total started at 0 and added to each round.',
    code: 'total = 0\nfor n in [4, 5, 6]:\n    total = total + n\nprint(total)',
  },
  {
    term: 'Iteration',
    category: 'Loops',
    definition: 'One trip through the body of a loop.',
    code: 'for i in range(3):\n    print("iteration", i)',
  },

  // Functions
  {
    term: 'Function',
    category: 'Functions',
    definition: 'A named block of code you can run as often as you like.',
    code: 'def greet():\n    print("hello")\n\ngreet()\ngreet()',
  },
  {
    term: 'def',
    category: 'Functions',
    definition: 'The keyword that starts a function definition. Defining it does not run it.',
    code: 'def wave():\n    print("wave")\n\nwave()',
  },
  {
    term: 'Call',
    category: 'Functions',
    definition: 'Running a function by writing its name and brackets.',
    code: 'def cheer():\n    print("yes")\n\ncheer()',
  },
  {
    term: 'Parameter',
    category: 'Functions',
    definition: 'A name in the definition that receives a value when the function is called.',
    code: 'def greet(name):\n    print("hello", name)\n\ngreet("Sara")',
  },
  {
    term: 'Argument',
    category: 'Functions',
    definition: 'The actual value you pass in when calling. Order matters for positional arguments.',
    code: 'def show(a, b):\n    print(a, b)\n\nshow("first", "second")',
  },
  {
    term: 'return',
    category: 'Functions',
    definition: 'Sends a value back to the caller and ends the function immediately.',
    code: 'def double(n):\n    return n * 2\n\nprint(double(4))',
  },
  {
    term: 'Default argument',
    category: 'Functions',
    definition: 'A value used when the caller leaves an argument out.',
    code: 'def greet(name="friend"):\n    print("hi", name)\n\ngreet()\ngreet("Ali")',
  },
  {
    term: 'Scope',
    category: 'Functions',
    definition: 'Where a name is visible. Variables made inside a function disappear when it ends.',
    code: 'def inside():\n    local = 5\n    print(local)\n\ninside()',
  },
  {
    term: 'Docstring',
    category: 'Functions',
    definition: 'A quoted description on the first line inside a function.',
    code: 'def add(a, b):\n    """Return a plus b."""\n    return a + b\n\nprint(add(2, 3))',
  },

  // Errors
  {
    term: 'Traceback',
    category: 'Errors',
    definition: 'The block of text after an error. Read the last line first — it names the problem.',
    code: 'try:\n    print(1 / 0)\nexcept ZeroDivisionError as e:\n    print("caught:", e)',
  },
  {
    term: 'SyntaxError',
    category: 'Errors',
    definition: 'Python could not parse the code: missing colon, bracket or quote.',
    code: '# this would fail:  if True print(1)\nprint("missing colon is a SyntaxError")',
  },
  {
    term: 'IndentationError',
    category: 'Errors',
    definition: 'Lines in the same block have different leading spaces.',
    code: 'if True:\n    print("four spaces")\n    print("same block")',
  },
  {
    term: 'NameError',
    category: 'Errors',
    definition: 'A name was used before it was created — usually a typo or a variable from another scope.',
    code: 'try:\n    print(unknown_name)\nexcept NameError:\n    print("no such name")',
  },
  {
    term: 'TypeError',
    category: 'Errors',
    definition: 'Two types cannot be combined or called that way, like "2" + 2.',
    code: 'try:\n    print("2" + 2)\nexcept TypeError:\n    print("str plus int")',
  },
  {
    term: 'ValueError',
    category: 'Errors',
    definition: 'The type is right but the value is not usable, like int("abc").',
    code: 'try:\n    int("abc")\nexcept ValueError:\n    print("not a number")',
  },
  {
    term: 'IndexError',
    category: 'Errors',
    definition: 'A position past the end of a list. Remember indexes start at 0.',
    code: 'items = [1, 2]\ntry:\n    print(items[5])\nexcept IndexError:\n    print("out of range")',
  },
  {
    term: 'KeyError',
    category: 'Errors',
    definition: 'A dictionary key that does not exist. Use get() for a safe lookup.',
    code: 'ages = {"ali": 21}\ntry:\n    print(ages["sara"])\nexcept KeyError:\n    print("missing key")',
  },
  {
    term: 'ZeroDivisionError',
    category: 'Errors',
    definition: 'Dividing by zero. Check the divisor is not empty or zero first.',
    code: 'try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("cannot divide by zero")',
  },
  {
    term: 'try / except',
    category: 'Errors',
    definition: 'Run risky code in try, and handle the expected error in except so the program continues.',
    code: 'try:\n    print(int("7"))\nexcept ValueError:\n    print("bad input")',
  },
  {
    term: 'raise',
    category: 'Errors',
    definition: 'Throws an error on purpose when your own rules are broken.',
    code: 'def check(n):\n    if n < 0:\n        raise ValueError("negative")\n    return n\n\ntry:\n    check(-1)\nexcept ValueError:\n    print("rejected")',
  },
  {
    term: 'Bug',
    category: 'Errors',
    definition: 'Code that runs but does the wrong thing. Errors that stop the program are crashes, not bugs.',
    code: 'total = 0\nfor n in [1, 2, 3]:\n    total = n  # bug: should add\nprint(total)',
  },

  // Tools
  {
    term: 'REPL',
    category: 'Tools',
    definition: 'Read-Eval-Print Loop: type one line, see the result immediately. The playground runs your whole file instead.',
    code: 'print(2 + 2)\nprint("one line at a time")',
  },
  {
    term: 'Library / module',
    category: 'Tools',
    definition: 'A file of ready-made code you import instead of writing yourself.',
    code: 'import math\nprint(math.sqrt(16))',
  },
  {
    term: 'Runtime',
    category: 'Tools',
    definition: 'The thing that executes your code. Here it is a Python runtime compiled to run inside the browser.',
    code: 'print("running in your browser")',
  },
  {
    term: 'Debugging',
    category: 'Tools',
    definition: 'Finding why code misbehaves: print the values, shrink the example, fix one thing at a time.',
    code: 'def average(nums):\n    print("nums:", nums)\n    return sum(nums) / len(nums)\n\nprint(average([2, 4]))',
  },
  {
    term: 'Refactor',
    category: 'Tools',
    definition: 'Improving the shape of working code without changing what it does.',
    code: 'def area(w, h):\n    return w * h\n\nprint(area(3, 4))',
  },
  {
    term: 'Big O',
    category: 'Tools',
    definition: 'Shorthand for how work grows with input size — a loop over n items is O(n).',
    code: 'items = [1, 2, 3, 4]\ncount = 0\nfor item in items:\n    count = count + 1\nprint(count)',
  },
  {
    term: 'Algorithm',
    category: 'Tools',
    definition: 'A finite set of steps that solves a problem — the recipe behind the code.',
    code: 'def biggest(nums):\n    best = nums[0]\n    for n in nums:\n        if n > best:\n            best = n\n    return best\n\nprint(biggest([3, 9, 2]))',
  },
  {
    term: 'Version control',
    category: 'Tools',
    definition: 'Saving snapshots of your code so you can go back. Git is the standard tool.',
    code: 'version = "v1"\nprint("snapshot saved:", version)',
  },
  {
    term: 'Recursion',
    category: 'Tools',
    definition: 'A function that calls itself to solve a smaller version of the same problem.',
    code: 'def countdown(n):\n    if n == 0:\n        print("done")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)',
  },
];

export const glossaryByCategory = (category) =>
  category === 'All' ? GLOSSARY : GLOSSARY.filter((entry) => entry.category === category);

export const searchGlossary = (query) => {
  const q = (query || '').trim().toLowerCase();
  if (!q) return GLOSSARY;
  return GLOSSARY.filter(
    (entry) =>
      entry.term.toLowerCase().includes(q) ||
      entry.definition.toLowerCase().includes(q) ||
      entry.category.toLowerCase().includes(q)
  );
};