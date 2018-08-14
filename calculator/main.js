'use strict';

$(document).ready(function () {
    // Variables
    const MINLENGTH = 2;
    var nums = $(".num");
    var ops = $('.ops');
    var currentNum = "";
    var previousNum = "";
    var result;
    var operator;
    var data = [];
    

    // When: Number is clicked. Get the current number selected
    var setCurrentNumer = function () {
        currentNum += this.getAttribute("data-num");
        viewer.innerHTML = currentNum; // Display current number;  
    };

    // When: Operator is clicked. Pass number to previousNum and save operator
    var setOperator = function () {
        data.push(currentNum);
        operator = this.getAttribute("data-ops");
        data.push(operator);
        displayData(data);

        //clear the value of currentNum
        currentNum = "";
    };

    // Perform operation
    var calculate = function (num1, num2, ops) {
        switch (ops) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            // If equal is pressed without an operator, keep number and continue
            default:
                result = num1;
        }
        return result;
    };

    var refreshData = function (num1, num2, res) {
        data.splice(num1, num2);
        result = result.toString()
        data.splice(num1, num1, result);
    };

    var displayData = function (data) {
        $("#display").html(data);
    };

    var clearData = function () {
        currentNum = "";
        previousNum = "";
        operator = "";
        data = [];
        displayData(data);
    };

    // When: Equals is clicked. Calculate result
    var equalButton = function () {
        if (!isNaN(parseFloat(currentNum))) {
            data.push(currentNum);
        }

        for (var i = 0; i < data.length; i++) {
            previousNum = data[0];
            operator = data[1];
            currentNum = data[2];
            previousNum = parseFloat(previousNum);
            currentNum = parseFloat(currentNum);

            if (data.length > MINLENGTH) {
                result = calculate(previousNum, currentNum, operator);
                refreshData(0, 3, result);
            } else {
                result = previousNum;
                refreshData(0, 1, result);
            }
        };

        // If NaN or Infinity returned
        if (!isFinite(result)) {
            if (isNaN(result)) { // If result is not a number; 
                result = "You broke it!";
            } else { // If result is infinity, set off by dividing by zero
                result = "Cannot divide by zero";
            }
            $('#viewer').addClass("broken");
        }

        // Display result, finally!
        viewer.innerHTML = result;

        // Now reset oldestNum, previousNum, operator & keep result
        clearData();
    };

    //When: C button is pressed. Clear everything
    var clearAll = function () {
        clearData();
        viewer.innerHTML = "0";
        $('#viewer').removeClass("broken");
        displayData(data);
    };

    //When: CE button is pressed. Clear the last number
    var clearCurrentNumber = function () {
        currentNum = "";
        viewer.innerHTML = "0";
        $('#viewer').removeClass("broken")
    };

    //When: back button is pressed. Clear the last digit
    var backOne = function () {
        currentNum = currentNum.toString();
        if (viewer.innerHTML.length > 1 || currentNum.length > 1) {
            currentNum = currentNum.slice(0, currentNum.length - 1);
            viewer.innerHTML = currentNum;
        } else {
            viewer.innerHTML = "0";
            $('#viewer').removeClass("broken")
        }
    };

    //Add click event to numbers 
    for (var i = 0; i < nums.length; i++) {
        nums[i].onclick = setCurrentNumer;
    };

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = setOperator;
    };

    // Add click event to equal sign
    $('#equals').on("click", equalButton)

    // Add click event to all clear button
    $("#clear").on("click", clearAll);

    //Add click event to clear last button
    $('#clearLast').on('click', clearCurrentNumber);

    //Add click event to back button
    $('#backOne').on('click', backOne);

});