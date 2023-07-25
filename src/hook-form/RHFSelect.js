import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

RHFSelect.propTypes = {
  name: PropTypes.string,
};

export default function RHFSelect({ name, options, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl fullWidth>
            <TextField
              {...field}
              InputLabelProps={{
                style: {
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#FF5B00",
                },
              }}
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={field.value === "" ? 0 : field.value}
              error={!!error}
              helperText={error?.message}
              {...other}>
              {options.length > 0 &&
                options.map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        </>
      )}
    />
  );
}
