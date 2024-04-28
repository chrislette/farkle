function roleSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
}

window.onload = function() { 
    var img = document.getElementById("die1"); 
    elm.onkeyup = function(event) { 
        if (this.value.length === 1) { 
            switch (roleSingleDie()) { 
            case (1): 
                img.src = "dice/1.png";
                break;
            case (2):
                img.src = "dice/2.png";
                break;
            case (3):
                img.src = "dice/3.png";
                break;
            case (4):
                img.src = "dice/4.png";
                break;
            case (5):
                img.src = "dice/5.png";
                break;
            case (6):
                img.src = "dice/6.png";
                break;
            }
        }
    }

}

