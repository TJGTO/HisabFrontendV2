import React, { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";
import { TextField, Autocomplete } from "@mui/material";

const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];
export default function MultiSelect() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const OnChange = (value: any) => {
    if (Array.isArray(value)) setSelectedNames(value);
  };

  return (
    <Autocomplete
      multiple
      options={names}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Multiple Autocomplete"
        />
      )}
    />
  );
}
