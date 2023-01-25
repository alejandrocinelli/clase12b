import {faker} from '@faker-js/faker';

const generateFaker = () => {
    const data = [];
    for (let i = 0; i <= 4; i++) {
        const product = {
            id: faker.datatype.number(),
            title: faker.vehicle.vehicle(),
            thumbnail: faker.image.transport(),
            price: faker.datatype.number()
        }
        data.push(product)
    }
   

    return data;
}

export default generateFaker;