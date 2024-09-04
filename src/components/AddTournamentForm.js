import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const AddTournamentForm = ({ addTournament }) => {
  const [tournament, setTournament] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: '',
    groups: 6,
  });

  const handleChange = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTournament(tournament);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add/Edit Tournament
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Tournament Name"
          name="name"
          fullWidth
          margin="normal"
          value={tournament.name}
          onChange={handleChange}
        />
        <TextField
          label="Start Date"
          name="startDate"
          fullWidth
          margin="normal"
          value={tournament.startDate}
          onChange={handleChange}
        />
        <TextField
          label="End Date"
          name="endDate"
          fullWidth
          margin="normal"
          value={tournament.endDate}
          onChange={handleChange}
        />
        <TextField
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          value={tournament.status}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Save Tournament
        </Button>
      </form>
    </Container>
  );
};

export default AddTournamentForm;
