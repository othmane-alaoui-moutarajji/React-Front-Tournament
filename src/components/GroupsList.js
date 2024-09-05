import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useParams } from 'react-router-dom';

function GroupsList() {
  const { tournamentId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamDetails, setTeamDetails] = useState(null);
  const [loadingTeamDetails, setLoadingTeamDetails] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`http://localhost:5019/api/Group/groupsByTournament/${tournamentId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(`Failed to fetch groups: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [tournamentId]);

  const handleTeamClick = async (teamId) => {
    setSelectedTeamId(teamId);
    setLoadingTeamDetails(true);
    try {
      const response = await fetch(`http://localhost:5019/api/Team/${teamId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTeamDetails(data);
    } catch (err) {
      setError(`Failed to fetch team details: ${err.message}`);
    } finally {
      setLoadingTeamDetails(false);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeamId(null);
    setTeamDetails(null);
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Loading groups...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Groups for Current Tournament 
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Group Name</strong></TableCell>
              <TableCell><strong>Teams</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map(group => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  {group.teams.map(team => (
                    <Chip
                      key={team.id}
                      label={team.name}
                      onClick={() => handleTeamClick(team.id)}
                      sx={{ margin: 0.5, cursor: 'pointer' }}
                      icon={<InfoIcon />}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for team details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Team Details</DialogTitle>
        <DialogContent>
          {loadingTeamDetails ? (
            <CircularProgress />
          ) : teamDetails ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                {teamDetails.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Players:
              </Typography>
              <ul>
                {teamDetails.players.map(player => (
                  <li key={player.id}>
                    {player.name} - {player.email}
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <Typography variant="body1" color="error">
              No details available for this team.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default GroupsList;
