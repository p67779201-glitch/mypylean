// Longer, complete programs for the playground. Each one runs top to bottom
// with no input() so it works inside the browser engine.
export const PLAYGROUND_PROGRAMS = [
  {
    label: 'Hello world',
    category: 'Start here',
    code: 'name = "Pyro"\nprint("Hello,", name)',
  },
  {
    label: 'Star triangle',
    category: 'Loops',
    code: 'for row in range(1, 6):\n    print("*" * row)',
  },
  {
    label: 'Times table',
    category: 'Loops',
    code: 'def table(n):\n    for i in range(1, 6):\n        print(n, "x", i, "=", n * i)\n\ntable(7)',
  },
  {
    label: 'FizzBuzz',
    category: 'Decisions',
    code: 'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)',
  },
  {
    label: 'Grade book',
    category: 'Dictionaries',
    code: 'scores = {"Ali": 82, "Sara": 91, "Omar": 67}\n\ntotal = 0\nfor name, score in scores.items():\n    grade = "A" if score >= 90 else "B" if score >= 75 else "C"\n    print(name, score, grade)\n    total = total + score\n\nprint("Average:", total / len(scores))',
  },
  {
    label: 'Word count',
    category: 'Dictionaries',
    code: 'text = "a small cat and a small dog"\n\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\n\nfor word in sorted(counts):\n    print(word, counts[word])',
  },
  {
    label: 'Temperature table',
    category: 'Functions',
    code: 'def to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nfor c in range(-10, 41, 10):\n    print(c, "C is", round(to_fahrenheit(c), 1), "F")',
  },
  {
    label: 'Palindrome check',
    category: 'Strings',
    code: 'def is_palindrome(text):\n    clean = text.lower().replace(" ", "")\n    return clean == clean[::-1]\n\nfor word in ["level", "python", "Never odd or even"]:\n    print(word, is_palindrome(word))',
  },
  {
    label: 'Shopping list',
    category: 'Lists',
    code: 'cart = []\ncart.append("bread")\ncart.append("milk")\ncart.append("eggs")\n\nprint("Items:", len(cart))\nfor item in cart:\n    print("-", item)\n\ncart.remove("milk")\nprint("After removing milk:", cart)',
  },
  {
    label: 'Primes under 50',
    category: 'Loops',
    code: 'primes = []\nfor n in range(2, 50):\n    is_prime = True\n    for d in range(2, n):\n        if n % d == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(n)\n\nprint(primes)\nprint("Count:", len(primes))',
  },
  {
    label: 'Quiz scorer',
    category: 'Functions',
    code: 'questions = [\n    ("2 + 2", 4),\n    ("3 * 3", 9),\n    ("10 - 7", 3),\n]\n\nscore = 0\nfor prompt, answer in questions:\n    print("Question:", prompt)\n    if answer == eval(prompt):\n        score = score + 1\n        print("  correct")\n\nprint("Score:", score, "of", len(questions))',
  },
  {
    label: 'Safe division',
    category: 'Errors',
    code: 'def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "cannot divide by zero"\n\nprint(safe_div(10, 2))\nprint(safe_div(10, 0))',
  },
];

export const PLAYGROUND_CATEGORIES = [
  'All',
  'Programs',
  'Basics',
  'Data',
  'Decisions',
  'Loops',
  'Functions',
  'Errors',
  'Tools',
];