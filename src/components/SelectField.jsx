import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const SelectField = ({ value, onChange, arr, others, title, fromDash }) => {
  return (
    <div>
      {!fromDash && (
        <Typography fontSize={18} mb={1}>
          {title}
        </Typography>
      )}
      <FormControl fullWidth className="mb-4">
        <InputLabel id="select">{fromDash ? title : "Select"}</InputLabel>
        <Select
          labelId="select"
          id="select"
          value={value}
          label={fromDash ? title : "Select"}
          onChange={onChange}
          name={others}
          className="Select capitalize"
        >
          {arr.map((item) => (
            <MenuItem value={item} key={item} className="MenuItem capitalize">
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
