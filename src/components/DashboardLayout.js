import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Box } from '@mui/material';
import Dashboard from './Dashboard';
import TeamList from './TeamList';
import MatchList from './MatchList';
import AddTeamForm from './TeamForm';
import AddTournamentForm from './AddTournamentForm';
import RecordScores from './RecordScores'; // Importer le composant pour enregistrer les scores
import GroupRankings from './GroupRankings'; // Importer le composant pour afficher les classements des groupes

const drawerWidth = 240;

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Tournament Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/teams">
              <ListItemText primary="Teams" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/matches">
              <ListItemText primary="Matches" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/teams/add">
              <ListItemText primary="Add Team" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/tournaments/add">
              <ListItemText primary="Add Tournament" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/record-scores">
              <ListItemText primary="Record Match Scores" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/group-rankings">
              <ListItemText primary="View Group Rankings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="matches" element={<MatchList />} />
          <Route path="teams/add" element={<AddTeamForm />} />
          <Route path="tournaments/add" element={<AddTournamentForm />} />
          <Route path="record-scores" element={<RecordScores />} /> {/* Route pour enregistrer les scores */}
          <Route path="group-rankings" element={<GroupRankings />} /> {/* Route pour afficher les classements */}
        </Routes>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
