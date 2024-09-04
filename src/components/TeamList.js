import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const teams = [
  { id: 1, name: 'Team A', site: 'Casa', playersCount: 7 },
  { id: 2, name: 'Team B', site: 'Rabat', playersCount: 7 },
  // Ajoutez plus d'équipes ici
];

function TeamList() {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Site</TableCell>
              <TableCell>Number of Players</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.site}</TableCell>
                <TableCell>{team.playersCount}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary" component={Link} to={`/teams/edit/${team.id}`} style={{ marginRight: 8 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TeamList;
