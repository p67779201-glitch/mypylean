// Modules 3 and 4 — loops and lists.
export const modulesLoops = [
  {
    id: 'loops',
    title: 'Loops',
    tagline: 'Make the computer repeat itself',
    accent: 'violet',
    topics: [
      {
        id: 'for-range',
        title: 'for loops with range()',
        minutes: 6,
        summary: 'Repeat a block a set number of times.',
        theory: `
          <p>A <code>for</code> loop repeats code for every number in <code>range()</code>.</p>
          <pre><code>for i in range(5):
    print(i)</code></pre>
          <p>Counting starts at 0, so this prints 0, 1, 2, 3, 4 — five numbers in total.</p>
          <h3>Choose your numbers</h3>
          <pre><code>range(1, 4)     # 1, 2, 3
range(2, 11, 2) # 2, 4, 6, 8, 10</code></pre>
          <p><code>range(start, stop, step)</code>: stop is never included.</p>
        `,
        example: { code: 'for i in range(1, 4):\n    print("Round", i)', note: 'Three rounds because stop is not included.' },
        practice: {
          task: 'Print the numbers 1 to 5, one per line, using a for loop and range().',
          starter: '# for loop below\n',
          solution: 'for i in range(1, 6):\n    print(i)',
          expected: '1\n2\n3\n4\n5',
        },
        quiz: [
          { p: 'How many times does range(4) repeat?', o: ['3', '4', '5'], a: 1, e: 'range(4) gives 0, 1, 2, 3.' },
          { p: 'What is the first number in range(5)?', o: ['0', '1', '5'], a: 0, e: 'Counting starts at zero.' },
          { p: 'What does range(2, 7) include?', o: ['2 to 7', '2 to 6', '0 to 6'], a: 1, e: 'The stop value is never included.' },
        ],
      },
      {
        id: 'while-loop',
        title: 'while loops',
        minutes: 6,
        summary: 'Repeat while something stays true.',
        theory: `
          <p>A <code>while</code> loop keeps going as long as its condition is true.</p>
          <pre><code>count = 3
while count > 0:
    print(count)
    count = count - 1
print("Go!")</code></pre>
          <h3>Do not forget to change the value</h3>
          <p>If the condition never becomes false, the loop never stops. Always move the counter inside the loop.</p>
        `,
        example: { code: 'fuel = 3\nwhile fuel > 0:\n    print("Fuel:", fuel)\n    fuel -= 1', note: 'fuel -= 1 is short for fuel = fuel - 1.' },
        practice: {
          task: 'Count down from 3, then print Go!',
          starter: 'start = 3\n# while loop, then print Go!\n',
          solution: 'start = 3\nwhile start > 0:\n    print(start)\n    start -= 1\nprint("Go!")',
          expected: '3\n2\n1\nGo!',
        },
        quiz: [
          { p: 'When does a while loop stop?', o: ['When the condition is false', 'After 10 rounds', 'Never'], a: 0, e: 'It checks the condition every round.' },
          { p: 'What is fuel -= 1 short for?', o: ['fuel = 1', 'fuel = fuel - 1', 'fuel = fuel + 1'], a: 1, e: 'It subtracts one from itself.' },
          { p: 'What happens if the condition never becomes false?', o: ['The loop ends quietly', 'It runs forever', 'Python fixes it'], a: 1, e: 'That is an infinite loop — press stop.' },
        ],
      },
      {
        id: 'nested-loops',
        title: 'Loops inside loops',
        minutes: 7,
        summary: 'Build rows and shapes with two counters.',
        theory: `
          <p>A loop inside another loop is <strong>nested</strong>. The inner loop finishes completely for each single step of the outer loop.</p>
          <pre><code>for row in range(3):
    line = ""
    for col in range(3):
        line = line + "*"
    print(line)</code></pre>
          <p>That builds a three by three square of stars. Change the second range to <code>range(row + 1)</code> and it becomes a triangle.</p>
        `,
        example: { code: 'for row in range(3):\n    for col in range(row + 1):\n        print("*", end="")\n    print("")', note: 'end="" keeps the stars on one line.' },
        practice: {
          task: 'Print three rows of exactly three stars.',
          starter: '# Two loops\n',
          solution: 'for row in range(3):\n    print("***")',
          expected: '***\n***\n***',
        },
        quiz: [
          { p: 'In a nested loop, which one finishes first?', o: ['The inner loop', 'The outer loop', 'Both together'], a: 0, e: 'The inner loop runs fully for each outer step.' },
          { p: 'How many stars appear if the outer loop runs 4 and the inner runs 2?', o: ['6', '8', '2'], a: 1, e: '4 × 2 = 8.' },
          { p: 'What keeps print() from starting a new line?', o: ['end=""', 'print("")', 'newline=False'], a: 0, e: 'end="" replaces the default newline.' },
        ],
      },
      {
        id: 'break-continue',
        title: 'break and continue',
        minutes: 5,
        summary: 'Skip a round or leave the loop early.',
        theory: `
          <p><code>continue</code> jumps to the next round. <code>break</code> leaves the loop completely.</p>
          <pre><code>for i in range(1, 8):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)</code></pre>
          <p>This prints 1, 2, 4, 5 — it skips 3 and stops before 6.</p>
        `,
        example: { code: 'for n in range(1, 10):\n    if n % 2 == 0:\n        continue\n    print(n)', note: 'Only the odd numbers come through.' },
        practice: {
          task: 'Print the numbers 1 to 6 but skip 3.',
          starter: 'for i in range(1, 7):\n    # skip 3 here\n    print(i)\n',
          solution: 'for i in range(1, 7):\n    if i == 3:\n        continue\n    print(i)',
          expected: '1\n2\n4\n5\n6',
        },
        quiz: [
          { p: 'What does break do?', o: ['Skips one round', 'Leaves the loop early', 'Restarts the loop'], a: 1, e: 'break ends the loop immediately.' },
          { p: 'What does continue do?', o: ['Jumps to the next round', 'Ends the loop', 'Repeats the same round'], a: 0, e: 'The rest of that round is skipped.' },
          { p: 'Which loop is easiest to make infinite?', o: ['for loop', 'while loop', 'nested loop'], a: 1, e: 'A while loop depends on a changing condition.' },
        ],
      },
    ],
  },
  {
    id: 'lists',
    title: 'Lists',
    tagline: 'Keep many values in one place',
    accent: 'amber',
    topics: [
      {
        id: 'list-basics',
        title: 'Lists of things',
        minutes: 5,
        summary: 'Group values together in order.',
        theory: `
          <p>A <strong>list</strong> holds many values in order, inside square brackets.</p>
          <pre><code>fruits = ["apple", "banana", "mango"]
print(fruits)
print(len(fruits))</code></pre>
          <p>Lists can hold numbers, text, or even other lists. Items are separated by commas.</p>
        `,
        example: { code: 'pets = ["cat", "dog", "fish"]\nprint(pets)\nprint(len(pets))', note: 'len() counts the items.' },
        practice: {
          task: 'Make a list called colors with three colours, then print how many items it has.',
          starter: 'colors = [\n# print the length\n',
          solution: 'colors = ["red", "green", "blue"]\nprint(len(colors))',
          expected: '3',
        },
        quiz: [
          { p: 'Which symbol wraps a list?', o: ['( )', '[ ]', '{ }'], a: 1, e: 'Square brackets make a list.' },
          { p: 'What does len([4, 8, 2, 6]) give?', o: ['3', '4', '20'], a: 1, e: 'len counts the items, not their total.' },
          { p: 'Can a list hold text and numbers together?', o: ['Yes', 'No', 'Only numbers'], a: 0, e: 'Python lists are flexible.' },
        ],
      },
      {
        id: 'indexing',
        title: 'Positions and slices',
        minutes: 6,
        summary: 'Pick one item or a range of items.',
        theory: `
          <p>Positions start at 0. The first item is <code>[0]</code>.</p>
          <pre><code>fruits = ["apple", "banana", "mango"]
print(fruits[0])
print(fruits[-1])</code></pre>
          <p><code>-1</code> means the last item. A slice grabs a piece: <code>fruits[0:2]</code> gives the first two items.</p>
          <p>Asking for a position that does not exist causes an error.</p>
        `,
        example: { code: 'nums = [10, 20, 30, 40]\nprint(nums[1])\nprint(nums[-1])\nprint(nums[1:3])', note: 'A slice stops before the second number.' },
        practice: {
          task: 'From nums = [10, 20, 30, 40], print the first item and the last item.',
          starter: 'nums = [10, 20, 30, 40]\n# print first, then last\n',
          solution: 'nums = [10, 20, 30, 40]\nprint(nums[0])\nprint(nums[-1])',
          expected: '10\n40',
        },
        quiz: [
          { p: 'What is the first position in a list?', o: ['0', '1', '-1'], a: 0, e: 'Python counts from zero.' },
          { p: 'What does nums[-1] give?', o: ['An error', 'The first item', 'The last item'], a: 2, e: 'Negative positions count from the end.' },
          { p: 'What does [5, 6, 7, 8][1:3] give?', o: ['[5, 6]', '[6, 7]', '[6, 7, 8]'], a: 1, e: 'It starts at 1 and stops before 3.' },
        ],
      },
      {
        id: 'list-changing',
        title: 'Adding and removing',
        minutes: 6,
        summary: 'Grow, shrink and sort your list.',
        theory: `
          <p><code>append()</code> adds to the end, <code>remove()</code> deletes a value, and <code>sort()</code> puts things in order.</p>
          <pre><code>scores = [3, 8, 5]
scores.append(10)
scores.remove(3)
scores.sort()
print(scores)</code></pre>
          <p><code>pop()</code> removes the last item and hands it back to you.</p>
        `,
        example: { code: 'queue = ["Ali", "Sara"]\nqueue.append("Hina")\nprint(queue)\nprint(queue.pop())\nprint(queue)', note: 'pop() returns the item it removed.' },
        practice: {
          task: 'Start with scores = [3, 8, 5], add 10, then sort, then print the list.',
          starter: 'scores = [3, 8, 5]\n# append, sort, print\n',
          solution: 'scores = [3, 8, 5]\nscores.append(10)\nscores.sort()\nprint(scores)',
          expected: '[3, 5, 8, 10]',
        },
        quiz: [
          { p: 'Which method adds to the end of a list?', o: ['add()', 'append()', 'push()'], a: 1, e: 'Python lists use append().' },
          { p: 'What does pop() do?', o: ['Removes the last item', 'Sorts the list', 'Empties the list'], a: 0, e: 'It removes and returns the last item.' },
          { p: 'After sort(), what is first in [9, 2, 7]?', o: ['9', '2', '7'], a: 1, e: 'Sorting goes from smallest up.' },
        ],
      },
      {
        id: 'list-loop',
        title: 'Looping through a list',
        minutes: 6,
        summary: 'Visit every item and add them up.',
        theory: `
          <p>A <code>for</code> loop can walk a list directly.</p>
          <pre><code>nums = [4, 6, 9]
total = 0
for n in nums:
    total = total + n
print(total)</code></pre>
          <p>Start a total at zero, add each item, and print the answer at the end. This pattern works for counting, averaging and finding the biggest.</p>
        `,
        example: { code: 'nums = [5, 1, 8]\nbiggest = nums[0]\nfor n in nums:\n    if n > biggest:\n        biggest = n\nprint(biggest)', note: 'Start with the first item, then compare the rest.' },
        practice: {
          task: 'For nums = [4, 6, 2], add every item into a total and print the total.',
          starter: 'nums = [4, 6, 2]\ntotal = 0\n# loop here\n',
          solution: 'nums = [4, 6, 2]\ntotal = 0\nfor n in nums:\n    total = total + n\nprint(total)',
          expected: '12',
        },
        quiz: [
          { p: 'Where should a running total start?', o: ['At 0', 'At the first item', 'At 100'], a: 0, e: 'Zero keeps the sum correct.' },
          { p: 'What does for n in [2, 4]: do?', o: ['Runs twice', 'Runs four times', 'Runs once'], a: 0, e: 'One round per item.' },
          { p: 'Total of [1, 2, 3, 4]?', o: ['7', '10', '12'], a: 1, e: '1 + 2 + 3 + 4 = 10.' },
        ],
      },
    ],
  },
];