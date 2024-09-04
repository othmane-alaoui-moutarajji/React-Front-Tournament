import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Importer l'icône de déconnexion
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tournament, setTournament] = useState(null); // État pour stocker les détails du tournoi
  const navigate = useNavigate();

  useEffect(() => {
    // Simulez une requête API pour obtenir les détails du tournoi
    const fetchTournament = async () => {
      try {
        // Remplacez par votre appel API réel
        const response = await fetch('/api/tournament/current');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTournament(data);
      } catch (err) {
        console.error('Failed to fetch tournament:', err);
      }
    };

    fetchTournament();
  }, []);

  

  const handleLogout = () => {
    // Implémentez ici la logique de déconnexion
    console.log('User logged out');
    navigate('/'); // Redirection vers la page de connexion après déconnexion
  };

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography variant="h4" gutterBottom>
            Tournament Details
          </Typography>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Affichage des détails du tournoi */}
      {tournament ? (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Tournament Details
            </Typography>
            <Typography variant="h6" gutterBottom>
              Name: {tournament.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Start Date: {new Date(tournament.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" gutterBottom>
              End Date: {new Date(tournament.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Status: {tournament.status}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" gutterBottom>
          Loading tournament details...
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Teams
              </Typography>
              <Typography variant="h2" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Matches
              </Typography>
              <Typography variant="h2" color="secondary">
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Groups
              </Typography>
              <Typography variant="h2" color="error">
                6
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      
    </Container>
  );
}

export default Dashboard;
