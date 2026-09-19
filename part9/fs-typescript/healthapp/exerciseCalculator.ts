interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Perfect';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not Bad';
  } else {
    rating = 1;
    ratingDescription = 'Try harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArguments = (args: string[]): {
  target: number;
  dailyHours: number[];
} => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error('Target must be a number');
  }

  const dailyHours = args.slice(3).map(Number);

  if (dailyHours.some((hours) => isNaN(hours))) {
    throw new Error('All exercise hours must be numbers');
  }

  if (dailyHours.length === 0) {
    throw new Error('At least one exercise day must be provided');
  }

  return {
    target,
    dailyHours
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ': ' + error.message;
  }
  console.log(errorMessage);
}