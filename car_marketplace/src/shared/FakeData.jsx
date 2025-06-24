import { faker } from "@faker-js/faker"


function CreateRandomCarlist(){

    return{
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        images:['https://hips.hearstapps.com/hmg-prod/images/p90495464-1677001974.jpg?crop=0.720xw:0.608xh;0.250xw,0.329xh&resize=1200:*'],
        // image: faker.image.transport(),
        miles:1000,
        gearType:'Automatic',
        price:faker.finance.amount(4000, 10000),
    }
}

const CarList = Array.from({ length: 12 }, () => CreateRandomCarlist());

export default {
    CarList
}