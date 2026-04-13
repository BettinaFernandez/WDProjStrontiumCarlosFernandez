function cake_result() { 
    const Question_1 = document.querySelector('input[name="Question_1"]:checked')?.value; //Query selector locates and interacts elements in the code
    const Question_2 = document.querySelector('input[name="Question_2"]:checked')?.value; //so for this it finds the value under Question_?
    const Question_3 = document.querySelector('input[name="Question_3"]:checked')?.value; 

   
let cake = ""; //conditions to output different answers
if (Question_1 === "A" && Question_2 === "A" && Question_3 === "A") {
    cake = "Rocky Road Flavor";
}
else if (Question_1 === "B" && Question_2 === "B" && Question_3 === "B") {
    cake = "Vanilla Flavor";
}
else if (Question_1 === "C" && Question_2 === "C" && Question_3 === "C") {
    cake = "Coffee Crumble Flavor";
}
else {
    cake = "Strawberry Flavor";
}
document.getElementById("result").innerText = cake; //returns output
}