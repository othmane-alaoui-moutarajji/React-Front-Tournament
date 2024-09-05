import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function EditTeam() {
  const { id } = useParams(); // Récupère l'ID de l'équipe depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    name: '',
    status: '',
    siteAffectation: '',
    players: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:5019/api/team/${id}`);
        setTeam(response.data);
      } catch (error) {
        setError(`Erreur lors de la récupération de l'équipe: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeam(prevTeam => ({
      ...prevTeam,
      [name]: value
    }));
  };

  const handlePlayersChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const updatedPlayers = [...team.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [name]: type === 'checkbox' ? checked : value
    };
    setTeam(prevTeam => ({
      ...prevTeam,
      players: updatedPlayers
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5019/api/team/${id}`, team);
      setSuccessMessage('Équipe mise à jour avec succès!');
      setSnackbarType('success');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/team-list'), 2000); // Redirection après succès
    } catch (error) {
      setError(`Erreur lors de la mise à jour de l'équipe: ${error.response?.data || error.message}`);
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: 20 }}>
        <Typography variant="h6">Chargement...</Typography>
        <CircularProgress style={{ marginTop: 20 }} />
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Modifier l'Équipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nom de l'Équipe"
              name="name"
              value={team.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Site d'Affectation"
              name="siteAffectation"
              value={team.siteAffectation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          
        </Grid>
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Joueurs
        </Typography>
        {team.players.map((player, index) => (
          <Grid container spacing={2} key={index} style={{ marginBottom: '10px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nom du Joueur"
                name="name"
                value={player.name}
                onChange={(event) => handlePlayersChange(index, event)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                value={player.email}
                onChange={(event) => handlePlayersChange(index, event)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                <input
                  type="checkbox"
                  name="isCaptain"
                  checked={player.isCaptain}
                  onChange={(event) => handlePlayersChange(index, event)}
                />
                Capitaine
              </label>
            </Grid>
          </Grid>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Mettre à Jour
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
        >
          {snackbarType === 'success' ? successMessage : error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditTeam;
