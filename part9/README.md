# Part 9 - Full Stack Open

This directory contains the exercises for Part 9 of the FullStackOpen course.

## Exercises

### 9.1: Body Mass Index
- Copy the contents of the `https://github.com/fullstack-hy2020/fs-typescript` repository into the project root.
- Initialize a new Node.js project inside the `healthapp` directory using `npm init`.
- Install TypeScript as a development dependency.
- Create a `tsconfig.json` file with the following configuration:

```js
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noEmit": true
  }
}
```

- Set `"type": "module"` in the `healthapp/package.json` file.
- Create a file named `bmiCalculator.ts`.
- Implement a function named `calculateBmi` that calculates the body mass index (BMI) using height in centimeters and weight in kilograms.
- The function should return a message describing the BMI category according to the BMI classification.
- Call the function with hard-coded values and print the result. The following code `console.log(calculateBmi(180, 74))` should print `Normal range`.
- Create an npm script named `calculateBmi` to type-check and run the program using `npm run calculateBmi`.

### 9.2: Exercise Calculator
- Implement the exercise calculator in a file named `exerciseCalculator.ts` within the same `healthapp` project.
- Create a function named `calculateExercises` that calculates the average number of daily exercise hours and compares it with a target amount of daily exercise.
- The function should accept:
  - An array containing the number of exercise hours for each day.
  - The target number of daily exercise hours.
- The function should return an object containing:
  - `periodLength`: The number of days in the training period.
  - `trainingDays`: The number of days on which exercise was performed.
  - `success`: A boolean indicating whether the target was achieved.
  - `rating`: A rating between 1 and 3 describing how well the target was met.
  - `ratingDescription`: A description explaining the rating.
  - `target`: The original target value.
  - `average`: The calculated average number of daily exercise hours.
- Define an interface for the result object.
- You may determine the rating descriptions yourself.
- The following array represents a week of exercise: `[3, 0, 2, 4.5, 0, 3, 1]`. Calling the function with this array and a target of 2 should return:

```js
{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}
```

- Create an npm script named `calculateExercises` to call the function with hard-coded values `npm run calculateExercises`.

### 9.3: Command Line
- Modify the `bmiCalculator.ts` and `exerciseCalculator.ts` programs so that their input parameters are provided as command-line arguments instead of hard-coded values.
- The `calculateBmi` program should accept:
  - Height in centimeters.
  - Weight in kilograms.
- The `calculateBmi` program should work with the following command: `npm run calculateBmi 180 91` and should print: `Overweight`.
- The `calculateExercises` program should accept:
  - The target number of daily exercise hours as the first argument.
  - A variable-length list of daily exercise hours as the remaining arguments.
- The `calculateExercises` program should accept inputs of different lengths.
- The `calculateExercises` program should work with the following command: `npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4` and should print:

```bash
{
  periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223
}
```

- Parse the command-line arguments using `process.argv`.
- Validate the provided arguments and ensure that values expected to be numbers are valid numbers.
- Handle missing, invalid, or otherwise inappropriate command-line arguments using exceptions and appropriate error messages.
- The `exerciseCalculator` should not assume a fixed number of exercise days. It should collect all exercise-hour arguments after the target value.
- If helper functions are defined in separate modules, use the JavaScript/TypeScript module system with import and export.
- Update the npm scripts so that the programs can be executed from the command line using:
  - `npm run calculateBmi <height> <weight>`
  - `npm run calculateExercises <target> <daily exercise hours...>`
