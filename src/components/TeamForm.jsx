import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function TeamForm() {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([
    { name: '', email: '', isCaptain: true },  // Capitaine
    { name: '', email: '', isCaptain: false },
    { name: '', email: '', isCaptain: false },
    { name: '', email: '', isCaptain: false },
    { name: '', email: '', isCaptain: false }
  ]);
  const [site, setSite] = useState('Rabat');
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false); // État pour le popup d'erreur
  const [errorMessage, setErrorMessage] = useState(''); // État pour le message d'erreur

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    if (field === 'isCaptain' && value) {
      updatedPlayers.forEach((player, i) => {
        if (i !== index) player.isCaptain = false;
      });
    }
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const teamData = {
      name: teamName,
      siteAffectation: site,
      captain: players[0],
      player2: players[1],
      player3: players[2],
      player4: players[3],
      player5: players[4],
      substitute1: players[5] || null,
      substitute2: players[6] || null,
      status: 0
    };

    try {
      await axios.post('http://localhost:5019/api/Team', teamData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOpenSuccessDialog(true); // Ouvre le popup de succès
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Stocke le message d'erreur
        setOpenErrorDialog(true); // Ouvre le popup d'erreur
      } else {
        console.error('Erreur lors de la création de l\'équipe :', error);
      }
    }
  };

  const addPlayer = () => {
    if (players.length >= 7) {
      setOpenDialog(true);
      return;
    }
    setPlayers([...players, { name: '', email: '', isCaptain: false }]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create a New Team
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Site Assignment</InputLabel>
              <Select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                label="Site Assignment"
              >
                <MenuItem value="Casa">Casa</MenuItem>
                <MenuItem value="Rabat">Rabat</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {players.map((player, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Player ${index + 1} Name`}
                  value={player.name}
                  onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Player ${index + 1} Email`}
                  value={player.email}
                  onChange={(e) => handlePlayerChange(index, 'email', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant={player.isCaptain ? "contained" : "outlined"}
                  color={player.isCaptain ? "primary" : "default"}
                  onClick={() => handlePlayerChange(index, 'isCaptain', true)}
                  fullWidth
                >
                  {player.isCaptain ? "Captain" : "Set as Captain"}
                </Button>
              </Grid>
            </React.Fragment>
          ))}

          {players.length < 7 && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={addPlayer}
                disabled={players.length >= 7}
              >
                Add Another Player
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Team
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Player Limit Reached</DialogTitle>
        <DialogContent>
          <Alert severity="info">You have reached the limit of 7 players.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Alert severity="success">The team has been created successfully!</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">{errorMessage}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeamForm;
