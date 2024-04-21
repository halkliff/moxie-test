import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const client = new PrismaClient();

await client.medSpaAddress.deleteMany();
await client.medSpaContact.deleteMany();
await client.medSpaAppointmentOnService.deleteMany();
await client.medSpaService.deleteMany();
await client.medSpaAppointment.deleteMany();
await client.medSpa.deleteMany();

console.log('Deleted all data in the database');

await Promise.allSettled(
  Array.from({ length: faker.number.int({ min: 2, max: 10 }) }).map(
    async () => {
      const medSpa = await client.medSpa.create({
        data: {
          name: faker.company.name(),
          addresses: {
            create: {
              addressLine1: faker.location.streetAddress(),
              addressLine2: faker.location.secondaryAddress(),
              number: faker.location.buildingNumber(),
              locality: faker.location.city(),
              administrativeArea: faker.location.state(),
              postalCode: faker.location.zipCode(),
              regionCode: faker.address.countryCode(),
            },
          },
          contacts: {
            createMany: {
                data: [
                    {
                      contactType: 'PHONE',
                      value: faker.phone.number(),
                    },
                    {
                      contactType: 'EMAIL',
                      value: faker.internet.email(),
                    },
                  ]
            },
          },
        },
      });

      console.log(`Created med spa: ${medSpa.name}`);
    },
  ),
);
