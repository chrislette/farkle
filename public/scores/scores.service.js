class ScoreList {
    scores = [];
    scoresService;

    constructor(scoresService) {
        this.scoresService = scoresService;
    }

    init() {
        this.render();
    }

    createScoreListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'scores-list';
        ul.className = 'list-group list-group-flush checked-list-box';
        return ul;
    };

    _renderListRowItem = (score) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.id = `score-${score.id}`;
        listGroupItem.className = 'list-group-item';

        const deleteBtn = document.createElement('button');
        const deleteBtnTxt = document.createTextNode('X');
        deleteBtn.className = 'btn btn-secondary';
        deleteBtn.addEventListener('click', this._deleteEventHandler(score.id));
        deleteBtn.appendChild(deleteBtnTxt);

        const scoreScoreSpan = document.createElement('span');
        const scoreScore = document.createTextNode(score.score);
        scoreScoreSpan.appendChild(scoreScore);

        const scoreUserSpan = document.createElement('span');
        const scoreUser = document.createTextNode(score.user);
        scoreUserSpan.appendChild(scoreUser);

        const scoreTimeSpan = document.createElement('span');
        const scoreTime = document.createTextNode(score.time_scored);
        scoreTimeSpan.appendChild(scoreTime); 

        // add list item's details
        listGroupItem.append(deleteBtn);
        listGroupItem.append(scoreScoreSpan);
        listGroupItem.append(scoreUserSpan);
        listGroupItem.append(scoreTimeSpan);

        return listGroupItem;
    };

    _renderList = () => {
        const scoresDiv = document.getElementById('scores');
        const loadingDiv = scoresDiv.childNodes[1];
        const fragment = document.createDocumentFragment();
        const ul = document.createElement('ul');
        ul.id = 'scores-list';
        ul.className = 'list-group list-group-flush checked-list-box';

        this.scores.map((score) => {
            const listGroupRowItem = this._renderListRowItem(score);

            ul.appendChild(listGroupRowItem);
        });

        fragment.appendChild(ul);
        scoresDiv.replaceChild(fragment, loadingDiv);
    }

    _renderMsg = () => {
        const scoresDiv = document.getElementById('scores');
        const loadingDiv = scoresDiv.childNodes[0];
        const listParent = document.getElementById('scores-list');
        const msgDiv = this._createMsgElement('Play some games to score!');

        if (scoresDiv) {
            scoresDiv.replaceChild(msgDiv, loadingDiv);
        } else {
            scoresDiv.replace(msgDiv, listParent);
        }
    };

    // addScore = async (newScore) => {
    //     try {
    //         const { score } = newScore;
    //         await this.scoresService.addScore(newScore);
    //         this.scores.push(newScore);
    //     } catch (err) {
    //         console.log(err);
    //         alert('Unable to add score. Please try again later.');
    //     }
    // }

    // _addScoreEventHandler = () => {
    //     const scoreInput = document.getElementById('formInputScoreScore');
    //     const score_score = parseInt(scoreInput.value);

    //     if (!score_score) {
    //         alert('Please enter a score.');
    //         return;
    //     }

    //     const { newScore, newScoreEl } = this._createNewScoreEl(score_score);

    //     this.addScore(newScore);

    //     const listParent = document.getElementById('scores-list');

    //     if (listParent) {
    //         listParent.appendChild(newScoreEl);
    //     } else {
    //         this._renderList();
    //     }
    //     scoreInput.value = '';
    // }

    // _createNewScoreEl = (score) => {
    //     const score_id = this.scores[this.scores.length - 1].id + 1;
    //     const user = getStorage("username");
    //     const time_scored = new Date().toISOString();
    //     const newScore = { score, user, time_scored };
    //     const newScoreEl = this._renderListRowItem(newScore);

    //     return { newScore, newScoreEl };
    // };

    deleteScore = async (scoreId) => {
        try {
            const res = await this.scoresService.deleteScore(scoreId);
            this.scores = this.scores.filter((score) => score.scoreId !== scoreId);

            if (res !== null) {
                alert ('Score deleted successfully!');
            }
            return res;
        } catch (err) {
            alert('Unable to delete score. Please try again later.');
        }
    };

    _deleteEventHandler = (scoreId) => async () => {
        const score = document.getElementById(`score-${scoreId}`);
        score.remove();

        this.deleteScore(scoreId).then(() => {
            if (!this.scores.length) {
                this._renderMsg();
            }
        });
    };

    _createMsgElement = (msg) => {
        const msgDiv = document.createElement('div');
        const text = document.createTextNode(msg);
        msgDiv.id = 'user-message';
        msgDiv.className = 'center';
        msgDiv.appendChild(text);

        return msgDiv;
    }

    render = async () => {
        const scores = await this.scoresService.getScores();

        try {
            if (scores.length) {
                this.scores = scores;
                this._renderList();
            } else {
                this._renderMsg();
            }
        } catch (err) {
//            alert(`Error: ${err.message}`);
        }
    };
}