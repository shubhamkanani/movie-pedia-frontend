import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import styles from "./Select.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "rgb(30, 146, 88)",
    },
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, index) => currentYear - index
);

const Dropdown = ({ selectedItem, setSelectedItem }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 150 }}>
        <InputLabel
          id="demo-multiple-name-label"
          style={{ top: "-5px", color: "#fff" }}
        >
          Years
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          className={styles.select}
          multiple
          value={selectedItem}
          onChange={handleChange}
          input={<OutlinedInput label="year" />}
          MenuProps={MenuProps}
          classes={{ select: { color: "red" } }}
        >
          {years.map((year) => (
            <MenuItem
              key={year}
              value={year}
              sx={{
                margin: "2px 0",
              }}
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
