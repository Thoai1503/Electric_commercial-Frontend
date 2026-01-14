import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/store";
import { fetchProductVariant } from "../../../../reducers/filterReducer";

export const useFilterPage = (category: string, max: number, min: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const filterState = useSelector(
    (state: RootState) => state.filterProduct.filter_state
  );
  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder handler - can be implemented if needed
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = e.target;

    const numericValue = Number(value);
    const filterValue: string | number = isNaN(numericValue)
      ? value
      : numericValue;

    const filterKey = `attributes.${name}`;
    const currentFilterValues = filterState?.filters?.[filterKey] || [];

    const filterExists = filterKey in (filterState?.filters || {});

    let newFilterValues: (string | number)[];

    if (filterExists) {
      if (checked) {
        newFilterValues = currentFilterValues.includes(filterValue)
          ? currentFilterValues
          : [...currentFilterValues, filterValue];
      } else {
        newFilterValues = currentFilterValues.filter((v) => v !== filterValue);
      }
    } else {
      newFilterValues = checked ? [filterValue] : [];
    }

    const updatedFilters = { ...filterState?.filters };

    if (newFilterValues.length > 0) {
      updatedFilters[filterKey] = newFilterValues;
    } else if (filterExists) {
      delete updatedFilters[filterKey];
    }

    // Log the filters object that will be sent to the thunk
    // This will be converted to: attributes.5=16%2C18&attributes.6=2 by the reducer
    console.log("Filters object:", updatedFilters);

    dispatch(
      fetchProductVariant({
        skip: 0,
        take: 8,
        sortBy: filterState?.sortBy,
        order: filterState?.order,
        category: category,
        filters: updatedFilters,
        maxPrice: max,
        minPrice: min,
      })
    );
  };
  return { handleChange, handleChangeFilter };
};
