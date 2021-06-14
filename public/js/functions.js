const getCards = () => {
    return candidates.map(candidate => {
        return `
        <div class="card" id="${candidate.id}">
            <div class="card-info">                
                <div class="candidate-info">
                    <span class="candidate-name">${candidate.name}</span>
                </div>
            </div>
            <button class="card-btn btn-matim" onclick=vote(0,${candidate.id},inviteeName)>מתאים לי</button>
            <button class="card-btn btn-no-matim" onclick=vote(1,${candidate.id},inviteeName)>לא מתאים לי</button>
            <button class="card-btn btn-zorm" onclick=vote(2,${candidate.id},inviteeName)>זורמים</button>
        </div>
        `
    })
}

const getInvitation = () => {
    
        return `
        <div class="card" id="">
            <div class="card-info">                
                <div class="candidate-info">
                    <span class="candidate-name-1">המארגן: ${event.name} </label></span>
                    <span class="candidate-name-1">תאריך: ${event[votes.selected]}</span>
                    <span class="candidate-name-1">סוג האירוע: ${event.eventType}</span>
                    <span class="candidate-name-1">מזון: ${event.foodType}</span>


                </div>
            </div>
            <button class="card-btn btn-zorm" onclick=conf()>איזה כיף</button>
        </div>
        `
    
}

const getSummary = () => {
    return candidates.map(candidate => {
        return `
        <div class="card" id="${candidate.id}">
            <div class="card-info">                
                <div class="candidate-info">
                    <span class="candidate-name">${candidate.name}</span>
                </div>
            </div>
            ${getVotes(candidate.id)}

            <button class="card-btn btn-zorm" onclick=selectDate(${candidate.id})>בחר/י</button>
        </div>
        `
    })
}

const getVotes = (id) => {
    let t = '';
    const votesDate = (id === 0) ? 'date' : 'date1';
    for (const property in votes[votesDate]) {
        let text = 'זורמים';
        switch (votes[votesDate][property]) {
            case 0:
                text = 'מתאים';
                break;
            case 1:
                text = 'לא מתאים';
                break;
            default:
                break;
        }

        t += `<div class="vote-btn-1">${property} - ${text}</div>`;
    }
    return t;

}

const selectDate = async (date) => {
    console.log(`selectDate=${date}`);
    const dateOption = (date === 0) ? 'date' : 'date1';

    document.getElementById('main').style.display = "none";
    document.getElementById('main1').style.display = "none";

    document.getElementById('summary').style.display = "none";
    document.getElementById('endsummary').style.display = "";
    db.collection('votes').doc(phone).set({ selected: dateOption, selectedDate: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    confetti({
        particleCount: 300,
        spread: 90,
        ticks: 300
      });


}

const vote = async (option, date, name) => {
    console.log(`vote was called, option=${option}, name=${name}, date=${date}`);
    document.getElementById(date).style.opacity = 0.4;
    document.getElementById(date).style.pointerEvents = "none";
    

    voteCount++;
    const dateOption = (date === 0) ? 'date' : 'date1';
    console.log(`dateOption=${dateOption}`);
    const objToSet = {
        [dateOption]: {
            [name]: option
        }
    }

    confetti({
        particleCount: 300,
        spread: 90,
      });

    db.collection('votes').doc(phone).set(objToSet, { merge: true });


    if (voteCount === 2) {
        document.getElementById('endvote').style.display = "";
        document.getElementById('main').style.display = "none";
        document.getElementById('main1').style.display = "none";

        document.getElementById('cards').style.display = "none";


    };
}

const conf = () => {
    confetti({
        particleCount: 300,
        spread: 90,
      });
}

