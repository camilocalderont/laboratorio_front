import { Button, Box, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router";

const MainButtons = () => {
    const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Prueba Técnica  - Laboratorio 4IDigital
      </Typography>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={() => navigate('/registro-pacientes')}>
          Registro de Pacientes
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/registro-estudio')}>
          Registro de Estudio de Sangre
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/consulta-pacientes')}>
          Consulta de Pacientes
        </Button>
      </Box>
    </Container>
  );
};

export default MainButtons;
