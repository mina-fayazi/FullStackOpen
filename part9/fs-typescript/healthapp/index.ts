import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== 'string' || typeof weight !== 'string') {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((value: unknown) => isNaN(Number(value)))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const exercises = daily_exercises.map((value: unknown) => Number(value));
  const targetNumber = Number(target);

  const result = calculateExercises(exercises, targetNumber);

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});