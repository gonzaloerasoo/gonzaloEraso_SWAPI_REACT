import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchFormProps {
  onSearch: (term: string) => void;
  onClear: () => void;
}

const SearchForm = ({ onSearch, onClear }: SearchFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 3 }}
    >
      <TextField
        fullWidth
        placeholder="Buscar personaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "grey.500" }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#FFE81F",
          color: "#000",
          "&:hover": { bgcolor: "#e6d01a" },
          px: 3,
          fontWeight: "bold",
        }}
      >
        Buscar
      </Button>
    </Box>
  );
};

export default SearchForm;
