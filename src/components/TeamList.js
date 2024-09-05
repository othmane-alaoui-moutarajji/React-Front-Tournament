import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5019/api/team');
        setTeams(response.data);
      } catch (error) {
        setError(`Erreur lors de la récupération des équipes: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleDeleteClick = (teamId) => {
    setSelectedTeamId(teamId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5019/api/team/${selectedTeamId}`);
      setTeams(teams.filter(team => team.id !== selectedTeamId));
      setSnackbarMessage('Équipe supprimée avec succès!');
      setSnackbarType('success');
    } catch (error) {
      setSnackbarMessage(`Erreur lors de la suppression de l'équipe: ${error.response?.data || error.message}`);
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setOpenDialog(false);
      setSelectedTeamId(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeamId(null);
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: 20 }}>
        <Typography variant="h6">Chargement...</Typography>
        <CircularProgress style={{ marginTop: 20 }} />
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Équipes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Site</TableCell>
              <TableCell>Nombre de Joueurs</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map(team => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.siteAffectation}</TableCell>
                <TableCell>{team.players?.length || 0}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-team/${team.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(team.id)}
                    style={{ marginLeft: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette équipe ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default TeamList;
