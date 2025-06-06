const updateState = (
  key: string,
  value: string,
  setForm: any,
  updateError?: any
) => {
  setForm((prev: any) => {
    return { ...prev, [key]: value };
  });
  if (updateError) {
    updateError((prev: any) => {
      return { ...prev, [key]: "" };
    });
  }
};

export { updateState };
