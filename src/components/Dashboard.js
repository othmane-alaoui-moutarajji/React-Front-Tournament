import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch('http://localhost:5019/api/Tournament/current');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTournament(data);
      } catch (err) {
        setError(`Failed to fetch tournament: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/'); // Redirection vers la page de connexion après déconnexion
  };

  const handleEditTournament = () => {
    navigate('/edit-tournament'); // Redirection vers le formulaire de modification du tournoi
  };

  const handleGenerateGroups = async () => {
    if (!tournament || !tournament.id) {
      console.error('Tournament ID is missing');
      return;
    }

    // Check if groups are already generated
    if (tournament.groupsGenerated) {
      console.log('Groups already generated.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5019/api/Tournament/generate-groups/${tournament.id}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      
      // Update tournament state to reflect groups are now generated
      setTournament(prevState => ({
        ...prevState,
        groupsGenerated: true
      }));

      // Redirection vers la liste des groupes après génération
      navigate(`/groups/${tournament.id}`);
    } catch (err) {
      setError(`Failed to generate groups: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Loading tournament details...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

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
          No tournament data available.
        </Typography>
      )}

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

      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGenerateGroups}
          sx={{ fontSize: '16px', padding: '10px 20px' }}
        >
          Generate Groups
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
