import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { Character } from "../types";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
      }}
    >
      <CardActionArea
        sx={{ height: "100%", p: 1 }}
        onClick={() => navigate(`/character/${character.uid}`)}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonIcon sx={{ mr: 1, color: "#FFE81F" }} />
            <Typography variant="h6" fontWeight="bold">
              {character.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={`Altura: ${character.height} cm`}
              size="small"
              variant="outlined"
              sx={{ borderColor: "grey.600" }}
            />
            <Chip
              label={`Masa: ${character.mass} kg`}
              size="small"
              variant="outlined"
              sx={{ borderColor: "grey.600" }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;
