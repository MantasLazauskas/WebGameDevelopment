const clickFunction=()=>
    {
        document.getElementById("demo").innerHTML = "This is new content";      //Declare the clickFunction methods
    }

    document.getElementById("demo").addEventListener("click", clickFunction);