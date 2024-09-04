import React from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';

function RecordScores() {
  // État et logique pour l'enregistrement des scores
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implémentez la logique pour enregistrer les scores
    alert('Scores recorded successfully');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Record Match Scores
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Match ID"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Score Team 1"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Score Team 2"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Scores
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default RecordScores;
