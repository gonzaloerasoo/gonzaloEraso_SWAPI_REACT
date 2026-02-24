import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface DetailProperties {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
}

const CharacterDetail = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<DetailProperties | null>(null);
  const [homeworld, setHomeworld] = useState<string>("");
  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://swapi.tech/api/people/${uid}`);
        const data = await res.json();
        const props: DetailProperties = data.result.properties;
        setCharacter(props);

        if (props.homeworld) {
          const hwRes = await fetch(props.homeworld);
          const hwData = await hwRes.json();
          setHomeworld(hwData.result.properties.name);
        }

        if (props.films && props.films.length > 0) {
          const filmResults = await Promise.all(
            props.films.map((url: string) =>
              fetch(url)
                .then((r) => r.json())
                .then((d) => d.result.properties.title as string),
            ),
          );
          setFilms(filmResults);
        }
      } catch {
        setError("Error al cargar el personaje");
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchDetail();
  }, [uid]);

  if (loading) {
    return (
      <Container
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#FFE81F" }} />
        <Typography sx={{ ml: 2 }}>Cargando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Container>
    );
  }

  if (!character) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "#FFE81F" }}
      >
        Volver
      </Button>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 3, color: "#FFE81F" }}
        >
          {character.name}
        </Typography>
        <Divider sx={{ mb: 3, borderColor: "#333" }} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Altura
            </Typography>
            <Typography variant="body1">{character.height} cm</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Masa
            </Typography>
            <Typography variant="body1">{character.mass} kg</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Género
            </Typography>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {character.gender}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Año de nacimiento
            </Typography>
            <Typography variant="body1">{character.birth_year}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Color de ojos
            </Typography>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {character.eye_color}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="caption" color="grey.500" display="block">
              Color de cabello
            </Typography>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {character.hair_color}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3, borderColor: "#333" }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            color="grey.500"
            display="block"
            sx={{ mb: 0.5 }}
          >
            Planeta natal
          </Typography>
          <Typography variant="body1">{homeworld || "Cargando..."}</Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="grey.500"
            display="block"
            sx={{ mb: 1 }}
          >
            Películas
          </Typography>
          {films.length > 0 ? (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {films.map((film) => (
                <Chip
                  key={film}
                  label={film}
                  sx={{ bgcolor: "#FFE81F", color: "#000", fontWeight: "bold" }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="grey.500">
              Sin películas registradas
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CharacterDetail;
