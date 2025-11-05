export const useFilterPage = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    console.log(value, checked, e.currentTarget.id, e.currentTarget.name);
  };

  return { handleChange };
};
