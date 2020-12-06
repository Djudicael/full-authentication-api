import { createCustomer, getCusrtomerByEmail, getCustomers } from '../src/repository/customer.repository.js';
import Customer from '../src/domain/Customer.js';


const run = async () => {
    const customer = new Customer("judi", "bebe@getCusrtomerByEmail.com", "john", "mamama", 'oups', new Date());

    //const result = await createCustomer(customer).catch(error => console.log(error));
    //console.log(result);


    //console.log(await getCustomers());
    console.log(await getCusrtomerByEmail("bebe@getCusrtomerByEmail.com1"));
}


run();