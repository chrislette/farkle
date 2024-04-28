const SCORES_API = `${BASE_API_URL}/scores`;

class ScoresService {
    getScores = () => _get(SCORES_API, OPTIONS_WITH_AUTH);

    addScore = (formData) => 
        _post(SCORES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteScore = (scoreId) => 
        _delete(`${SCORES_API}/${scoreId}`, OPTIONS_WITH_AUTH);
}
