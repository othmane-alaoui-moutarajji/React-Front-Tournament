import React from 'react';
import { List, ListItem, ListItemText, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TournamentList = ({ tournaments }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Active Tournaments</Typography>
      <List>
        {tournaments.map((tournament) => (
          <ListItem key={tournament.id}>
            <ListItemText
              primary={tournament.title}
              secondary={`Status: ${tournament.status}`}
            />
            {tournament.status === 'Registration' && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/register-team?tournamentId=${tournament.id}`}
              >
                Add Team
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TournamentList;
