export const changeName = (firstName: string) => ({
  type: 'INPUT__FIRST_NAME',
  firstName,
});

export const changeAge = (secondName: number) => ({
  type: 'INPUT_SECOND_NAME',
  secondName,
});
