import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Pagination,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import useSwapiData from "../hooks/useSwapiData";
import CharacterCard from "../components/CharacterCard";
import SearchForm from "../components/SearchForm";

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { characters, loading, totalPages, error } = useSwapiData(
    page,
    searchTerm,
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setPage(1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <SearchForm onSearch={handleSearch} onClear={handleClear} />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 8,
          }}
        >
          <CircularProgress sx={{ color: "#FFE81F" }} />
          <Typography sx={{ ml: 2 }}>Cargando...</Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && characters.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron resultados
          </Typography>
        </Box>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {characters.map((character) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={character.uid}>
                <CharacterCard character={character} />
              </Grid>
            ))}
          </Grid>

          {!searchTerm && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default CharacterList;
