import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Importer l'icône de déconnexion
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tournament, setTournament] = useState(null); // État pour stocker les détails du tournoi
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch('http://localhost:5019/api/Tournament/current'); // Appel GET à l'API
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTournament(data); // Stocker les détails du tournoi
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

  const handleEditTournament = () => {
    navigate('/edit-tournament'); // Redirection vers le formulaire de modification du tournoi
  };

  return (
    <Container>
      <Grid container alignItems="center" spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs>
          <Typography variant="h4" gutterBottom>
            Tournament Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Affichage des détails du tournoi dans un tableau */}
      {tournament ? (
        <Card sx={{ marginBottom: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Tournament Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Name:</strong></TableCell>
                    <TableCell>{tournament.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Start Date:</strong></TableCell>
                    <TableCell>{new Date(tournament.dateDebut).toLocaleDateString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>End Date:</strong></TableCell>
                    <TableCell>{new Date(tournament.dateFin).toLocaleDateString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Status:</strong></TableCell>
                    <TableCell>{tournament.status || 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" gutterBottom>
          Loading tournament details...
        </Typography>
      )}

      {/* Sections for total teams, matches, and groups */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Teams
              </Typography>
              <Typography variant="h3" color="primary">
                {tournament ? tournament.totalTeams : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Matches
              </Typography>
              <Typography variant="h3" color="secondary">
                {tournament ? tournament.totalMatches : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Groups
              </Typography>
              <Typography variant="h3" color="error">
                {tournament ? tournament.totalGroups : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Button to navigate to the edit form */}
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleEditTournament}
          sx={{ fontSize: '16px', padding: '10px 20px' }}
        >
          Edit Tournament
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
