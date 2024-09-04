import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TeamForm() {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([{ name: '', email: '', isCaptain: false }]);
  const [site, setSite] = useState(''); // État pour le site d'affectation
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false); // Pour afficher l'alerte de capitaine
  const navigate = useNavigate();

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    if (field === 'isCaptain' && value) {
      // Si on veut faire de ce joueur un capitaine, désigner le joueur en tant que capitaine
      updatedPlayers.forEach((player, i) => {
        if (i !== index) player.isCaptain = false;
      });
    }
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    if (players.length >= 7) {
      setOpenDialog(true);  // Ouvre le dialogue si le nombre de joueurs est supérieur ou égal à 7
      return;
    }
    setPlayers([...players, { name: '', email: '', isCaptain: false }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Soumission de l'équipe avec les validations
    if (!site) {
      alert('Site d\'affectation est obligatoire!');
      return;
    }
    // Ajoutez ici la logique pour soumettre les données de l'équipe
    navigate('/teams');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Team
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              <InputLabel>Site d'affectation</InputLabel>
              <Select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                label="Site d'affectation"
              >
                <MenuItem value="Casa">Casa</MenuItem>
                <MenuItem value="Rabat">Rabat</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Affichage dynamique des joueurs */}
          {players.map((player, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Player ${index + 1} Name`}
                  value={player.name}
                  onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                  fullWidth
                  required={index < 7}  // Les 7 premiers joueurs sont obligatoires
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Player ${index + 1} Email`}
                  value={player.email}
                  onChange={(e) => handlePlayerChange(index, 'email', e.target.value)}
                  fullWidth
                  required={index < 7}  // Les 7 premiers joueurs sont obligatoires
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant={player.isCaptain ? "contained" : "outlined"}
                  color={player.isCaptain ? "primary" : "default"}
                  onClick={() => handlePlayerChange(index, 'isCaptain', !player.isCaptain)}
                  fullWidth
                >
                  {player.isCaptain ? "Captain" : "Make Captain"}
                </Button>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={addPlayer}
              disabled={players.length >= 7}  // Désactive le bouton si 7 joueurs sont déjà ajoutés
            >
              Add Another Player
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Team
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Dialogue pour afficher le message lorsque le nombre de joueurs dépasse la limite */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Player Limit Reached</DialogTitle>
        <DialogContent>
          <Alert severity="info">You can only add up to 7 players. Please remove a player before adding more.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue pour afficher un message lorsque l'utilisateur essaie de désigner plus d'un capitaine */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>Captain Alert</DialogTitle>
        <DialogContent>
          <Alert severity="info">Only one player can be designated as captain. The previous captain designation has been removed.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeamForm;
