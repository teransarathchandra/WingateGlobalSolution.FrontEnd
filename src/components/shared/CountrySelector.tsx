import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const CountrySelector = ({selectedCountry, countries, disabled}) => {
  const [select, setSelect] = useState(selectedCountry);
  const onSelect = (code) => setSelect(code);
  console.log("SELECT", select);

  return (
    <ReactFlagsSelect
      selected={select}
      onSelect={onSelect}
      countries={countries}
      searchable={true}
      fullWidth={true}
      disabled={disabled}
      /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
    />
  );
};

export default CountrySelector;
