const getCards = () => {
    return candidates.map(candidate => {
        return `
        <div class="card" id="${candidate.id}">
            <div class="card-info">                
                <div class="candidate-info">
                    
                    <img src="images/${candidate.img}" class="app-logo ${candidate.class}">
                </div>
            </div>
            
            <button class="card-btn btn-matim" onclick=vote(0,"${candidate.name}","${candidate.id}")>0</button>
            <button class="card-btn btn-no-matim" onclick=vote(50,"${candidate.name}","${candidate.id}")>50</button>
            <button class="card-btn btn-zorm" onclick=vote(100,"${candidate.name}","${candidate.id}")>100</button>
        </div>
        `
    })
}

// const getInvitation = () => {

//     return `
//         <div class="card" id="">
//             <div class="card-info">                
//                 <div class="candidate-info">
//                     <span class="candidate-name-1">המארגן: ${event.name} </label></span>
//                     <span class="candidate-name-1">תאריך: ${event[votes.selected]}</span>
//                     <span class="candidate-name-1">סוג האירוע: ${event.eventType}</span>
//                     <span class="candidate-name-1">מזון: ${event.foodType}</span>


//                 </div>
//             </div>
//             <button class="card-btn btn-zorm" onclick=conf()>איזה כיף</button>
//         </div>
//         `

// }

// const getSummary = () => {
//     return candidates.map(candidate => {
//         return `
//         <div class="card" id="${candidate.id}">
//             <div class="card-info">                
//                 <div class="candidate-info">
//                     <span class="candidate-name">${candidate.name}</span>
//                 </div>
//             </div>
//             ${getVotes(candidate.id)}

//             <button class="card-btn btn-zorm" onclick=selectDate(${candidate.id})>בחר/י</button>
//         </div>
//         `
//     })
// }

// const getVotes = (id) => {
//     let t = '';
//     const votesDate = (id === 0) ? 'date' : 'date1';
//     for (const property in votes[votesDate]) {
//         let text = 'זורמים';
//         switch (votes[votesDate][property]) {
//             case 0:
//                 text = 'מתאים';
//                 break;
//             case 1:
//                 text = 'לא מתאים';
//                 break;
//             default:
//                 break;
//         }

//         t += `<div class="vote-btn-1">${property} - ${text}</div>`;
//     }
//     return t;

// }

// const selectDate = async (date) => {
//     console.log(`selectDate=${date}`);
//     const dateOption = (date === 0) ? 'date' : 'date1';

//     document.getElementById('main').style.display = "none";
//     document.getElementById('main1').style.display = "none";

//     document.getElementById('summary').style.display = "none";
//     document.getElementById('endsummary').style.display = "";
//     db.collection('votes').doc(phone).set({ selected: dateOption, selectedDate: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
//     confetti({
//         particleCount: 300,
//         spread: 90,
//         ticks: 300
//     });


// }

// function gototop() {
//     if (window.scrollY>0) {
//         window.scrollTo(0,window.scrollY-20)
//         setTimeout("gototop()",10)
//     }
// }

// function GoToTop() {
//     var urllocation = location.href;
//     if (urllocation.indexOf("#topAnchor") > -1) {
//         window.location.hash = "topAnchor";
//     } else {
//         return false;
//     }
// }

const vote = async (option, date, name) => {
    console.log(`vote was called, option=${option}, name=${name}, date=${date}`);
    document.getElementById(name).style.opacity = 0.4;
    document.getElementById(name).style.pointerEvents = "none";

    voteCount++;

    confetti({
        particleCount: 300,
        spread: 90,
    });

    try {
        const increment = firebase.firestore.FieldValue.increment(option);
        const storyRef = db.collection('results').doc(date.toLowerCase());
        storyRef.update({ count: increment }, { merge: true });
    } catch (error) {
        console.log('error writing to firebase', error);
    }


    try {
        var data = JSON.stringify({
            "amount": 1,
            "count": option,
            "name": date.toLowerCase(),
            "voteid": 1
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "https://lsybkmzyk:w0cfz8ggvt@bonsai-demo-4717631485.us-east-1.bonsaisearch.net:443/appvote/doc");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Basic bHN5YmttenlrOncwY2Z6OGdndnQ=");
          
          xhr.send(data);
    } catch (error) {
        console.log('error writing to elastic', error);
    }



    if (voteCount === 3) {
        // gototop();
        // window.scrollTo(0, 0);
        // window.one("scroll",function() { 
        //     document.body.scrollTop = document.documentElement.scrollTop = 0;
        //     window.scrollTo(0, 0);
        // });

        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        // GoToTop();

        document.getElementById('main').remove();
        document.getElementById('main1').remove();
        document.getElementById('cards').remove();
        document.getElementById('xlogo').remove();
        document.getElementById('endvote').style.display = "";

        // gototop();
    };
}

const conf = () => {
    confetti({
        particleCount: 300,
        spread: 90,
    });
}

