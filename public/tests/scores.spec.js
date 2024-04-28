const scoresService = new ScoresService();
const myScores = new ScoreList(scoresService);

describe('Score App', () => {
    it('should initialize some HTML', () => {
        spyOn(myScores, 'init');
        myScores.init();

        expect(myScores.init).toHaveBeenCalled();
    });

    it('should add a new score', async () => {
        const newScore = {
            id: 3,
            score: 2500,
            user: "TestUser",
            scored_time: '2024-04-26 16:08:32',
        };
        const addScoreServiceSpy = spyOn(scoresService, 'addScore');

        await myScores.addScore(newScore);

        expect(addScoreServiceSpy).toHaveBeenCalled();
        expect(myScores.scores.length).toBe(1);
    });

    it('should delete a score', async () => {
        const existingScore = {
            scoreId: 3,
            score: 2500,
            user: "TestUser",
            scored_time: '2024-04-26 16:08:32',
        };
        const deleteScoreServiceSpy = spyOn(scoresService, 'deleteScore');

        expect(myScores.scores.length).toBe(1);

        await myScores.deleteScore(existingScore.id);

        expect(deleteScoreServiceSpy).toHaveBeenCalled();
        expect(myScores.scores.length).toBe(0);
    });
})

