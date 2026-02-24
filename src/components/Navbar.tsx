import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ background: "linear-gradient(90deg, #000000 0%, #1a1a2e 100%)" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#FFE81F",
            fontWeight: "bold",
            letterSpacing: 2,
          }}
        >
          Star Wars
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
          Gonzalo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
