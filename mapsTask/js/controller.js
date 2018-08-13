
$(document).ready(function () {
    $("#name").focus();

//  Validation of input value 
    function isValidName(name) {
        var re = /^[a-zA-Z0-9\-_\s]+$/;
        return re.test(name)
    }

    function isValidAddress(address) {
        if ($("#address").val().trim().length > 0) {
            return true;
        }
    }

    function isValidEmail(email) {
        var re = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        return re.test(String(email));
    };

    function isValidPhoneNumber(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    };

    function isValidWeb(url) {
        var re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;;
        return re.test(String(url));
    };

//Clear error when input is focused
    function clearError() {
        $(this).next("p").css("visibility", "hidden")
    }

//When: submit button is click
    function submitInformation() {
        var name = $("#name").val();
        var address = $("#autocomplete").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var url = $("#url").val();

        if (!(isValidName(name))) {
            $("#nameError").css("visibility", "visible")
        };

        if (!(isValidAddress(address))) {
            $("#addressError").css("visibility", "visible")
        };

        if (!(isValidEmail(email))) {
            $("#emailError").css("visibility", "visible")
        };

        if (!(isValidPhoneNumber(phone))) {
            $("#phoneError").css("visibility", "visible")
        };

        if (!(isValidWeb(url))) {
            $("#urlError").css("visibility", "visible")
        };

        if (isValidName(name) && isValidEmail(email) && isValidPhoneNumber(phone)
            && isValidWeb(url) && isValidAddress(address)) {
            companyStorage.addCompany(name, address, email, phone, url);
            $("input").val("");
        };

        return address;
    }

// Add click event to submit button
    $("#submit").on("click", submitInformation);

//Add focus event to input. Clear error when is focused
    $("input").focus(clearError);

});

