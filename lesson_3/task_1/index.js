class Worker {
    constructor(first_name, last_name, born, speciality, experience, salary, gender, place_of_work, year_of_employment, year_of_dismissal, company, position) {
        this.first_name = first_name;  
        this.last_name = last_name;
        this.born = born;
        this.speciality = speciality;
        this.experience = experience;
        this.salary = salary;
        this.gender = gender;
        this.place_of_work = place_of_work;
        this.year_of_employment = year_of_employment;
        this.year_of_dismissal = year_of_dismissal;
        this.company = company;
        this.position = position;
    }
}

Worker.prototype.age = function() {
    var now = new Date();
    return now.getFullYear() - this.born;
}

class AirportWorker extends Worker {

}

class RailWayWorker extends Worker {

}

let air_worker = new AirportWorker('Kianu', 'Rivs', 1993);

air_worker.age();
