var nbrow = 35;
var nbcol = 35;
var tableHtml = document.getElementById("game-table");

function initGameTable(){

    for(var j = 0; j <= nbcol; j++){
        var trOpen = "<tr>";
        var td = "";

        for(var i = 0; i <= nbrow; i++){

            id = j+"-"+i;

            var tdOpen = "<td class=\"whited\" onclick=\"colBlack(this.id)\" id="+id+">";
            var colContent = "";
            var tdClose = "</td>";

            td = td+tdOpen+colContent+tdClose;
        }

        var trClose = "</tr>";

        var element = trOpen+td+trClose;

        tableHtml.insertAdjacentHTML("beforeend", element);
    }
}

function initArrayTable(){
    var table = new Array(nbcol);
    
    for(var i = 0; i <= nbcol; i++){
        table[i] = new Array(nbrow);
    }

    for(var i = 0; i <= nbcol; i++){
        for(var j = 0; j <= nbrow; j++){

            var col = document.getElementById(i+"-"+j);
            //Blanc c'est false et noir c'est true

            if(col.classList.contains("blacked")){
                table[i][j] = true;
            }else{
                table[i][j] = false;
            }
        }
    }

    return table;
}

function colBlack(id){
    var col = document.getElementById(id);

    if(col.classList.contains("blacked")){
        col.classList.remove("blacked");
        col.setAttribute("class", "whited");
    }else{
        col.classList.remove("whited");
        col.setAttribute("class", "blacked");
    }

}

function getLiveNeighbor(x, y){

    var tableArray = initArrayTable();
    var nb = 0;

    var neighbor = [
        tableArray?.[x-1]?.[y-1] == undefined ? false : tableArray[x-1][y-1], 
        tableArray?.[x-1]?.[y] == undefined ? false : tableArray[x-1][y],
        tableArray?.[x-1]?.[y+1] == undefined ? false : tableArray[x-1][y+1],

        tableArray?.[x]?.[y-1] == undefined ? false : tableArray[x][y-1], 
        tableArray?.[x]?.[y+1] == undefined ? false : tableArray[x][y+1],

        tableArray?.[x+1]?.[y-1] == undefined ? false : tableArray[x+1][y-1],
        tableArray?.[x+1]?.[y] == undefined ? false : tableArray[x+1][y],
        tableArray?.[x+1]?.[y+1] == undefined ? false : tableArray[x+1][y+1]  
    ];

    for(var i = 0; i <= 7; i++){
        if(neighbor[i]){
            nb = nb +1;
        }
    }

    return nb;
}

function startGame(){
    var tableArray = initArrayTable();

    setInterval(function(){
        for(var i = 0; i <= nbcol; i++){
            for(var j = 0; j <= nbrow; j++){
                
                var cell = tableArray[i][j];
                var liveNgb = getLiveNeighbor(i, j);
    
                if (cell){
                    //Si la cellule est vivante
    
                    if(!(liveNgb == 2 || liveNgb == 3)){
                        tableArray[i][j] = false;
                    }
                }else{
                    //Si la cellule est morte
    
                    if(liveNgb == 3){
                        tableArray[i][j] = true;
                    }
                }
            }
        }
    
        for(var i = 0; i <= nbcol; i++){
            for(var j = 0; j <= nbrow; j++){
                var cell = i+"-"+j;
                var col = document.getElementById(cell);
                
                var cellArray = tableArray[i][j];

                if(!cellArray){
                    if(col.classList.contains("blacked")){
                        col.classList.remove("blacked")
                    }
    
                    col.setAttribute("class", "whited");
                }else{
                    if(col.classList.contains("whited")){
                        col.classList.remove("whited")
                    }
    
                    col.setAttribute("class", "blacked");
                }
            }   
        }

        // console.log();
    }, 300);
}

initGameTable();