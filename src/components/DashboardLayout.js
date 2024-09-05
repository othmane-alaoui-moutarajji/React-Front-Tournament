import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Dashboard from './Dashboard';
import TeamList from './TeamList';
import MatchList from './MatchList';
import AddTeamForm from './TeamForm';
import AddTournamentForm from './AddTournamentForm';
import RecordScores from './RecordScores'; 
import GroupRankings from './GroupRankings'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';

const drawerWidth = 240;

function DashboardLayout() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Tournament Manager Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/dashboard/matches/group">Group Stage</MenuItem>
            <MenuItem component={Link} to="/dashboard/matches/quater-final">Quarter-Final</MenuItem>
            <MenuItem component={Link} to="/dashboard/matches/semi-final">Semi-Final</MenuItem>
            <MenuItem component={Link} to="/dashboard/matches/final">Final</MenuItem>
          </Menu>
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
            <ListItem button>
              <ListItemText primary="Matches" />
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
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
          <Route path="matches/group" element={<MatchList phase="Group" />} />
          <Route path="matches/quater-final" element={<MatchList phase="Quarter-Final" />} />
          <Route path="matches/semi-final" element={<MatchList phase="Semi-Final" />} />
          <Route path="matches/final" element={<MatchList phase="Final" />} />
          <Route path="teams/add" element={<AddTeamForm />} />
          <Route path="tournaments/add" element={<AddTournamentForm />} />
          <Route path="record-scores" element={<RecordScores />} />
          <Route path="group-rankings" element={<GroupRankings />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
