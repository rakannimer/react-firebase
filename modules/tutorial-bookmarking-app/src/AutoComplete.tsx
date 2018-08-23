import React from "react";
import {
  MenuItem,
  Typography,
  Input,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Downshift from "downshift";
import matchSorter from "match-sorter";

export const ClearInput = () => {
  return (
    <InputAdornment position="start">
      <IconButton aria-label="Clear Input">
        <Close />
      </IconButton>
    </InputAdornment>
  );
};

export const AutoComplete = ({
  items = [] as { label: string; value: string }[],
  onSelect = (selection: {}) => {}
}) => {
  return (
    <Downshift
      itemToString={item => (item ? item.label : "")}
      onChange={selection => {
        onSelect(selection);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        clearSelection
      }) => {
        return (
          <div style={{ width: "100%" }}>
            <Typography {...getLabelProps()}>Search</Typography>
            <Input
              fullWidth
              type={"text"}
              style={{
                width: "100%"
              }}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="Clear Input"
                    onClick={() => {
                      clearSelection();
                    }}
                    onMouseDown={() => {}}
                  >
                    <Close />
                  </IconButton>
                </InputAdornment>
              }
              {...getInputProps()}
            />

            <div {...getMenuProps()}>
              {isOpen
                ? matchSorter(items, inputValue, { keys: ["value"] }).map(
                    (item, index) => (
                      <MenuItem
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item.label}
                      </MenuItem>
                    )
                  )
                : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};
