import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const CountrySelector = ({ id, selectedCountry, countries, disabled, onCountrySelect }) => {
  const [select, setSelect] = useState(selectedCountry);
  const onSelect = (code) => {
    setSelect(code);
    onCountrySelect(code, id);
  };
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
