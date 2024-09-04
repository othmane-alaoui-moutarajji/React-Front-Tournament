import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function GroupRankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        // Remplacez par votre appel API réel
        const response = await fetch('/api/group-rankings');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRankings(data);
      } catch (err) {
        console.error('Failed to fetch rankings:', err);
      }
    };

    fetchRankings();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Group Rankings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankings.map((row) => (
              <TableRow key={row.teamId}>
                <TableCell>{row.groupName}</TableCell>
                <TableCell>{row.teamName}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>{row.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default GroupRankings;
