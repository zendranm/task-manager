export const changeName = (name: string) => ({
  type: 'INPUT_NAME',
  name,
});

export const changeAge = (age: number) => ({
  type: 'INPUT_AGE',
  age,
});
