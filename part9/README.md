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

### 9.4: Express
- Add Express as a project dependency.
- Create an HTTP GET endpoint at `/hello`.
- The `/hello` endpoint should respond with: `Hello Full Stack!`
- Replace the existing `tsconfig.json` file with the following configuration:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "module": "nodenext",
    "esModuleInterop": true,
    "allowImportingTsExtensions": true
  }
}
```

- Make sure the project contains no TypeScript errors.
- Add an npm script named `start` to run the application in production mode.
- Add an npm script named `dev` to run the application in development mode.
- The web application should be started with:
  - `npm start` in production mode.
  - `npm run dev` in development mode.
  
### 9.5: WebBMI
- Add an HTTP GET endpoint at `/bmi`.
- The endpoint should calculate BMI using `height` and `weight` query string parameters.
- The `height` parameter represents height in centimeters.
- The `weight` parameter represents weight in kilograms.
- For example, a request to `/bmi?height=180&weight=72` should return:

```json
{
  weight: 72,
  height: 180,
  bmi: "Normal range"
}
```

- If the query parameters are missing, invalid, or have an inappropriate type, return an appropriate HTTP status code and the following JSON structure:

```json
{
  error: "malformatted parameters"
}
```

- Do not copy the BMI calculation logic directly into `index.ts`.
- Convert `bmiCalculator.ts` into a TypeScript module that exports the BMI calculation function and import the BMI calculation function into `index.ts`.
- Keep the command-line functionality of `bmiCalculator.ts` working for the previous exercise.
- Prevent the command-line argument parsing and validation code from running when `bmiCalculator.ts` is imported by `index.ts`. To determine whether `bmiCalculator.ts` is being executed directly, use the condition `process.argv[1] === import.meta.filename` around the command-line execution code. The application should continue to support the command-line BMI calculator while also allowing the BMI calculation function to be imported and used by the Express application.