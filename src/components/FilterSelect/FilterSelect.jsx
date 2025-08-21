import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterSelect({ value, onChange, options, label }) {
  return (
    <FormControl sx={{ m: 0, minWidth: 200 }}>
      <InputLabel
        sx={{
          color: "var(--textColor)",
          "&.Mui-focused": {
            color: "var(--textColor)",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        className="custom-select"
        MenuProps={{
          PaperProps: {
            className: "custom-menu",
            sx: {
              padding: 0,
              margin: 0,
              backgroundColor: "var(--bg1)",
              boxShadow: "none",
            },
          },
        }}
        sx={{
          backgroundColor: "var(--bg1)",
          color: "var(--textColor) !important",
          "&:hover": {
            backgroundColor: "var(--bg1)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ".MuiSelect-icon": {
            color: "var(--textColor)",
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{ color: "var(--textColor) !important" }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
