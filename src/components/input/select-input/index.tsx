import { offset, useFloating } from "@floating-ui/react-dom";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState,
} from "react";

// Hooks
import { useOutsideClick } from "src/hooks/useOutsideClick";

// Icons
import ArrowDownIcon from "@svg/arrow-down.svg";

// Styles
import styles from "./styles.module.scss";

// Types
type Option = {
  value: string;
  title: string;
};

interface SelectInputProps {
  options: Option[];
  name: string;
  value?: string | null;
  onSelectOption: (...args: any[]) => void;
}

const getOptionTitle = (optionArray: Option[], value: string) => {
  const option = optionArray.filter(
    (option) => option.title === value || option.value === value
  );

  return option[0].title;
};

const SelectInputBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectInputProps
> = ({ options, onSelectOption, value = null, name, ...rest }, ref) => {
  const [optionList, setOptionsList] = useState(options);
  const [isOptionListVisible, setIsOptionListVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(value);
    value && setSearchValue(getOptionTitle(optionList, value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { x, y, placement, reference, floating, strategy } = useFloating({
    placement: "bottom-start",
    middleware: [offset(10)],
  });

  const inputWrapperRef = useRef(null);

  useOutsideClick(inputWrapperRef, () => setIsOptionListVisible(false));

  const handleOnSelectOption = (option: Option) => {
    setSearchValue(option.title);
    onSelectOption(name, option.value);
    setIsOptionListVisible(false);
  };

  return (
    <div className={styles.selectInputContainer} ref={inputWrapperRef}>
      <div ref={reference} className={styles.inputContainer}>
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onClick={() => {
            setIsOptionListVisible(true);
          }}
          onFocus={() => {
            setIsOptionListVisible(true);
          }}
          autoComplete="new-password"
          type="text"
          value={searchValue}
        />
        <select ref={ref} {...rest} className={styles.invisibleInput}>
          {optionList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <div className={styles.iconContainer}>
          <ArrowDownIcon
            style={{
              transform: `${
                isOptionListVisible ? "rotate(180deg)" : "rotate(0deg)"
              }`,
            }}
          />
        </div>
      </div>

      {isOptionListVisible && options.length > 0 && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
          className={styles.dropdown}
        >
          <ul>
            {optionList.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleOnSelectOption(option)}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const SelectInput = forwardRef(SelectInputBase);
