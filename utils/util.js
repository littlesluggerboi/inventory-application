const difference = (A, B) =>{
    const diff = {};
    for(let prop of Object.keys(A)){
        if(A[prop] != B[prop]){
            diff[prop] = B[prop];
        }
    }
    return diff;
}

const dbGameDataToViewGameData = (dbGameData) =>{
    const { developers, genres, ...game } = dbGameData;
    game.genres = genres.map((genre) => genre.genre);
    game.developers = developers.map((devs) => devs.developer);
    return game;
}

export default {difference, dbGameDataToViewGameData};