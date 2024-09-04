import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';

function AddTournamentForm() {
  const [name, setName] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [status, setStatus] = useState(''); // Ajoutez le statut si nécessaire
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/Tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dateDebut,
          dateFin,
          status // Incluez le statut si nécessaire
        }),
      });

      if (!response.ok) {
        // Lire la réponse en texte pour diagnostiquer l'erreur
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('Tournament created successfully:', result);
      // Redirection ou mise à jour de l'interface utilisateur après la création
    } catch (err) {
      console.error('Failed to create tournament:', err);
      setError(err.message);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create Tournament
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="datetime-local"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {/* Ajoutez un champ pour le statut si nécessaire */}
            {/* <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              required
              margin="normal"
            /> */}
            <Button type="submit" variant="contained" color="primary">
              Create Tournament
            </Button>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddTournamentForm;
