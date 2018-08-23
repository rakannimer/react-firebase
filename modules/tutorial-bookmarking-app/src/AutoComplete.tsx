import React from "react";
import {
  Typography,
  Input,
  InputAdornment,
  IconButton,
  Card,
  CardContent
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
  items = [] as { link_description: string; link_url: string }[],
  onSelect = (selection: {}) => {}
}) => {
  return (
    <Downshift
      itemToString={item => (item ? item.link_description : "")}
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
          <div style={{ width: "100%", height: 100 }}>
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
                ? matchSorter(items, `${inputValue}`, {
                    keys: ["link_description"]
                  }).map((item, index) => (
                    <Card
                      {...getItemProps({
                        key: item.link_url,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      <CardContent>
                        <Typography variant="headline">
                          {item.link_description}
                        </Typography>
                        <Typography component="p">{item.link_url}</Typography>
                      </CardContent>
                    </Card>
                  ))
                : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};
