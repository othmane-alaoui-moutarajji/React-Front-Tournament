import React, { useState, useEffect } from 'react';
import axios from 'axios';

const matchTypeMap = {
    0: 'Qualification', // Correspond à MatchType.Qualification
    1: 'Knockout',      // Correspond à MatchType.Knockout
    2: 'Final'          // Correspond à MatchType.Final
};

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Match List</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* <th>Match Number</th> */}
                        <th>Name</th>
                        {/* <th>Team 1</th>
                        <th>Team 2</th> */}
                        <th>Match Type</th>
                        <th>Scheduled Date</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            {/* <td>{match.matchNumber}</td> */}
                            <td>{match.name}</td>
                            {/* <td>{match.team1Name}</td>
                            <td>{match.team2Name}</td> */}
                            <td>{matchTypeMap[match.matchType]}</td> {/* Affichage des noms des types de match */}
                            <td>{match.scheduledDateTime ? new Date(match.scheduledDateTime).toLocaleString() : 'Not Scheduled'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchList;
