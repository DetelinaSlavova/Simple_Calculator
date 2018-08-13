var companyStorage = (function () {
    function Company(name, address, email, phone, web) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.web = web;
    };

    function CompanyStorage() {
        if (localStorage.getItem("allCompanies") != null) {
            this.companies = JSON.parse(localStorage.getItem("allCompanies"))
        } else {
            this.companies = [];
        }
    };

    CompanyStorage.prototype.addCompany = function (name, address, email, phone, web) {
        var isCompany = this.companies.find(function (company) {
            return company.email == email
        });

        if (!isCompany) {
            var company = new Company(name, address, email, phone, web)
            this.companies.push(company)
            localStorage.setItem("allCompanies", JSON.stringify(this.companies))
        } else {
            alert("Email address exist");
        }
    };

    return new CompanyStorage();

})();





