import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Remplacez par l'appel API réel pour récupérer les matches
        const response = await fetch('/api/matches');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Match List
      </Typography>
      {matches && matches.length > 0 ? (
        <List>
          {matches.map((match) => (
            <ListItem key={match.id}>
              <ListItemText primary={`Match ${match.id}: ${match.team1} vs ${match.team2}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No matches found.</Typography>
      )}
    </Container>
  );
}

export default MatchList;
