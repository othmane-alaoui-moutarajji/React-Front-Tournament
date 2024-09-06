import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';

const matchTypeMap = {
    0: 'Qualification', // Correspond à MatchType.Qualification
    1: 'Knockout',      // Correspond à MatchType.Knockout
    2: 'Final'          // Correspond à MatchType.Final
};

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [editMatchId, setEditMatchId] = useState(null);
    const [scores, setScores] = useState({});

    useEffect(() => {
        const fetchCurrentTournament = async () => {
            try {
                // Appel à l'API pour obtenir l'ID du tournoi actuel
                const response = await axios.get('http://localhost:5019/api/Tournament/current');
                const tournamentId = response.data.id; // Assurez-vous que l'ID du tournoi est bien récupéré

                // Appel à l'API pour obtenir les matchs de la phase de groupes pour le tournoi actuel
                const matchResponse = await axios.get(`http://localhost:5019/api/Tournament/run-group-stage-matches/${tournamentId}`);
                setMatches(matchResponse.data);
            } catch (error) {
                setError('Error fetching current tournament');
                console.error(error);
            }
        };

        fetchCurrentTournament();
    }, []);

    const handleEditClick = (matchId) => {
        setEditMatchId(matchId);
        // Initialiser les scores pour l'édition
        const match = matches.find(m => m.id === matchId);
        if (match) {
            setScores({
                [`${matchId}_team1`]: match.team1Score || 0,
                [`${matchId}_team2`]: match.team2Score || 0
            });
        }
    };

    const handleSaveClick = async (matchId) => {
        try {
            // Appel à l'API pour enregistrer les scores
            await axios.put('http://localhost:5019/api/Match/SetScore', {
                matchId,
                scoreTeam1: scores[`${matchId}_team1`] || 0,
                scoreTeam2: scores[`${matchId}_team2`] || 0,
            });

            // Mettre à jour l'état des matchs pour refléter les changements
            setMatches(matches.map(match =>
                match.id === matchId
                    ? { ...match, team1Score: scores[`${matchId}_team1`] || 0, team2Score: scores[`${matchId}_team2`] || 0 }
                    : match
            ));
            setEditMatchId(null);
        } catch (error) {
            setError('Error saving scores');
            console.error('Error saving scores:', error);
        }
    };

    const handleScoreChange = (matchId, teamId, value) => {
        setScores({
            ...scores,
            [`${matchId}_${teamId}`]: value
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Match List</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Match Type</th>
                        <th>Scheduled Date</th>
                        <th>Scores</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            <td>{match.name}</td>
                            <td>{matchTypeMap[match.matchType]}</td>
                            <td>{match.scheduledDateTime ? new Date(match.scheduledDateTime).toLocaleString() : 'Not Scheduled'}</td>
                            <td>
                                {editMatchId === match.id ? (
                                    <>
                                        <input
                                            type="number"
                                            value={scores[`${match.id}_team1`] || ''}
                                            onChange={(e) => handleScoreChange(match.id, 'team1', e.target.value)}
                                            className="form-control"
                                            style={{ width: '80px', display: 'inline-block', marginRight: '5px' }}
                                        />
                                        -
                                        <input
                                            type="number"
                                            value={scores[`${match.id}_team2`] || ''}
                                            onChange={(e) => handleScoreChange(match.id, 'team2', e.target.value)}
                                            className="form-control"
                                            style={{ width: '80px', display: 'inline-block', marginLeft: '5px' }}
                                        />
                                    </>
                                ) : (
                                    `${match.team1Score || 0} - ${match.team2Score || 0}`
                                )}
                            </td>
                            <td>
                                {editMatchId === match.id ? (
                                    <button className="btn btn-success" onClick={() => handleSaveClick(match.id)}>
                                        <FontAwesomeIcon icon={faSave} /> Save
                                    </button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => handleEditClick(match.id)}>
                                        <FontAwesomeIcon icon={faPen} /> Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchList;
