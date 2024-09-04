import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddTournamentForm() {
  const [name, setName] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5019/api/Tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
        body: JSON.stringify({
          name,
          dateDebut,
          dateFin
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('Tournament created successfully:', result);

      // Redirect to the dashboard or another page
      navigate('/dashboard');
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
