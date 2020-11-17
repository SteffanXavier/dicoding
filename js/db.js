var dbPromised = idb.open("champion_league", 1, function (upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(team);
            store.add(team);
            return tx.complete;
        })
        .then(function () {
            console.log("Save Team Success");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(Number(id));
            })
            .then(function (team) {
                resolve(team);
            });
    });
}

function delById(id) {
    dbPromised.then(function (db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(Number(id));
        return tx.complete;
    }).then(function () {
        console.log('Team with ID:', id, " deleted");
    });
}