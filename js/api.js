var base_url = "https://api.football-data.org/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function renderGetAllStandings(data) {
  var standingsHTML = "";

  standingsHTML += `
  <div class="card-panel">
  <div class="row center-align">
  <div class="col s12 m6"><p>Season Start : ${data.season.startDate}</p></div>
  <div class="col s12 m6"><p>Season End : ${data.season.endDate}</p></div>
  </div>
  <div class="row center-align">
    <p>Last Update : ${data.competition.lastUpdated}</p>
  </div>
  </div>
  `;

  data.standings.forEach(function (standing) {
    if (standing.type == "TOTAL") {
      var groupName = standing.group.replace("_", " ");

      standingsHTML += `
      <div class="card">
        <div class="card-content">
          <span class="card-title">${groupName}</span>

          <table class="table table-standings" data-group="">
          <thead>
              <tr>
                <th class="table_team-image"></th>
                <th class="table_team-name"></th>
                <th class="table_team-played">
                    <span class="label--big">Played</span>
                    <span class="label--small">P</span>
                </th>
                <th class="table_team-won">
                    <span class="label--big">Won</span>
                    <span class="label--small">W</span>
                </th>
                <th class="table_team-drawn">
                    <span class="label--big">Drawn</span>
                    <span class="label--small">D</span>
                </th>
                <th class="table_team-lost">
                    <span class="label--big">Lost</span>
                    <span class="label--small">L</span>
                </th>
                <th class="table_team-for">
                    <span class="label--big">For</span>
                    <span class="label--small">F</span>
                </th>
                <th class="table_team-against">
                    <span class="label--big">Against</span>
                    <span class="label--small">A</span>
                </th>
                <th class="table_team-goal-diff">
                    <span class="label--big">Goal</span>
                    <span class="label--small">G</span>
                </th>
                <th class="table_team-points">
                    <span class="label--big">Points</span>
                    <span class="label--small">Pts</span>
                </th> 
              </tr>
          </thead>
          <tbody>
      `;


      standing.table.forEach(function (tablee) {

        standingsHTML += `
          <tr data-team-id="${tablee.team.id}">
              <td class="table_team-image">
                  <a href="./teams.html?id=${tablee.team.id}">
                      <img class="responsive-img" src="${tablee.team.crestUrl}" />
                  </a>
              </td>
              <td class="table_team-name">
              <a href="./teams.html?id=${tablee.team.id}">${tablee.team.name}</a></td>
              <td class="table_team-played js-played">${tablee.playedGames}</td>
              <td class="table_team-won js-won">${tablee.won}</td>
              <td class="table_team-drawn js-drawn">${tablee.draw}</td>
              <td class="table_team-lost js-lost">${tablee.lost}</td>
              <td class="table_team-for js-goalsFor">${tablee.goalsFor}</td>
              <td class="table_team-against js-goalsAgainst">${tablee.goalsAgainst}</td>
              <td class="table_team-goal-diff js-goalDifference">${tablee.goalDifference}</td>
              <td class="table_team-points">
                  <strong class="js-points">${tablee.points}</strong>
              </td>
          </tr>             
        `;
      });

      standingsHTML += `
            </tbody>
          </table>
        </div>
      </div>    
      `;
    }
  });

  return standingsHTML;
}

function getAllStandings() {
  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/2001/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML = renderGetAllStandings(data);
          // if ($(window).width() < 514) {
          //     $('#menu2').addClass('f-nav');
          // } else {
          //     $('#menu2').removeClass('f-nav');
          // }
          document.getElementById("standings").innerHTML = standingsHTML;

          let carousels = document.getElementById("carousel")
          M.Carousel.init(carousels, {
            fullWidth: true,
            indicators: true,
            duration: 120,
            numVisible: 3
          });
        })
      }
    })
  }

  fetch(base_url + "v2/competitions/2001/standings", {
    method: 'GET',
    headers: {
      'X-Auth-Token': 'b2427906c62342ae8882862fbfa61923'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var standingsHTML = renderGetAllStandings(data);
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function renderGetTeamById(data) {
  var teamHTML = "";

  teamHTML += `
  <div class="card">
    <div class="card-content">
      <div class="row valign-wrapper">
        <div class="col s4">
          <img class="img-team" src="${data.crestUrl}">
        </div>
        <div class="col s8">
          <div class="row">
            <h2>${data.name}</h2>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Founded</span>
              </div>
              <div class="col s9">
                  <span>${data.founded}</span>
              </div>
          </div>                    
          <div class="row">
              <div class="col s3">
                  <span>Address</span>
              </div>
              <div class="col s9">
                  <span>${data.address}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Phone</span>
              </div>
              <div class="col s9">
                  <span>${data.phone}0</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Website</span>
              </div>
              <div class="col s9">
                  <span>${data.website}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Email</span>
              </div>
              <div class="col s9">
                  <span>${data.email}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Venue</span>
              </div>
              <div class="col s9">
                  <span>${data.venue}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  teamHTML += `
  <div class="card">
    <div class="card-content">
        <span class="card-title">Squad</span>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>                
  `

  data.squad.forEach(function (squadd) {
    if (squadd.role === "PLAYER") {
      teamHTML += `
      <tr>
        <td>${squadd.name}</td>
        <td>${squadd.position}</td>
        <td>${squadd.nationality}</td>
      </tr>                
      `
    }
  });

  teamHTML += `
            </tbody>
        </table>
    </div>
  </div>                
  `

  return teamHTML;
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "v2/teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamHTML = renderGetTeamById(data);
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "v2/teams/" + idParam, {
      method: 'GET',
      headers: {
        'X-Auth-Token': 'b2427906c62342ae8882862fbfa61923'
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        var teamHTML = renderGetTeamById(data);
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}


function getSavedTeams() {
  getAll().then(function (teams) {
    var teamsHTML = "";
    teams.forEach(function (team) {
      teamsHTML += `
        <div class="card-panel">
          <div class="row valign-wrapper">
            <div class="col s3">
              <img class="responsive-img" src="${team.crestUrl}" />
            </div>
            <div class="col s7">
              <a href="./teams.html?id=${team.id}&saved=true">
                <h5>${team.name}</h5>
              </a>
            </div>
            <div class="col s2">
              <a href="javascript:delSavedTeamById(${team.id})">
                <span>DELETE</span>
              </a>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    var teamHTML = renderGetTeamById(data);
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function delSavedTeamById(id) {
  delById(id);
  getSavedTeams();
}