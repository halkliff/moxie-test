<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Routes

The application runs on `http://localhost:3000/`.

The available routes are:

### MedSpas

#### `GET /medspas` - Get all medspas
- Query Params:
   - `offset` (`number`) - The page number
   - `limit` (`number`) - The number of items per page
   - `fromId` (`number`) - The id of the last item in the previous page. Can not be used with `offset`
   - `sortBy` (`object`) - An object with the keys being the fields from the medspa object and the values being the sort order (asc or desc)
     - **Example**: `'sortBy[name]=asc&sortBy[id]=desc'`
- Return Body: Array of:
  - `id` (`number`) - ID of the medspa
  - `name` (`string`) - Name of the Medspa
  - addresses (array of objects) - List of addresses associated to this Medspa:
    - `id` (`string`) - Address ID
    - `addressLine1` (`string`) - Address Line 1
    - `addressLine2` (`string` | `null`) - Address Line 2
    - `addressLine3` (`string` | `null`) - Address Line 3
    - `addressLine4` (`string` | `null`) - Address Line 4
    - `number` (`string` | `null`) - Building number
    - `sublocality` (`string` | `null`) - Smaller locality entry, such as neighborhood or block
    - `locality` (`string` | `null`) - City, town, vilage, etc
    - `administrativeArea` (`string` | `null`) - State, County, province, etc.
    - `postalCode` (`string`) - Postal (zip) code
    - `regionCode` (`string`) - 2-character string of the country (Example: US)
    - `createdAt` (`Date`) - When the Address was created
    - `updatedAt` (`Date`) - Last time the Address was updated
    - `deletedAt` (`Date` | `null`) - Whether (and when) the Address was deleted
  - contacts (array of objects) - List of contacts associated to this Medspa:
    - `id` (`string`) - ID of the contact
    - `contactType` (`PHONE_NUMBER` | `EMAIL`) - Type of the contact
    - `value` (`string`) - The value associated to this contact.
      - Example: The contact type as `EMAIL`, and the value as `john.doe@example.com`
    - `createdAt` (`Date`) - When the contact was created
    - `updatedAt` (`Date`) - Last time the contact was updated
    - `deletedAt` (`Date` | `null`) - Whether (and when) the contact was deleted
  - `createdAt` (`Date`) - When the Medspa was created
  - `updatedAt` (`Date`) - Last time the Medspa was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the Medspa was deleted

#### `GET /medspas/:id` - get a medspa
- Route Params:
  - `:id` - ID of the medspa
- Return Body:
  - `id` (`number`) - ID of the medspa
  - `name` (`string`) - Name of the Medspa
  - `createdAt` (`Date`) - When the Medspa was created
  - `updatedAt` (`Date`) - Last time the Medspa was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the med spa was deleted


### Services

#### `GET /medspas/:medspaId/services` - List all services of a Medspa
- Route Params:
  - `:medspaId` - ID of the medspa
- Query Params:
   - `offset` (`number`) - The page number
   - `limit` (`number`) - The number of items per page
   - `fromId` (`number`) - The id of the last item in the previous page. Can not be used with `offset`
   - `sortBy` (`object`) - An object with the keys being the fields from the medspa object and the values being the sort order (asc or desc)
- Return Body: Array of:
  - `id` (`number`) - ID of the service
  - `name` (`string`) - Name of the service
  - `description` (string | `null`) - description of the service
  - `price` (`number`) - how much the service costs
  - `duration` (`number`) - duration (in seconds) of the service session
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `createdAt` (`Date`) - When the service was created
  - `updatedAt` (`Date`) - Last time the service was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the service was deleted

#### `GET /medspas/:medspaId/services/:serviceId` - Get a single service
- Route Params:
  - `:medspaId` - ID of the medspa
  - `:serviceId` - ID of the service
- Return Body:
  - `id` (`number`) - ID of the service
  - `name` (`string`) - Name of the service
  - `description` (string | `null`) - description of the service
  - `price` (`number`) - how much the service costs
  - `duration` (`number`) - duration (in seconds) of the service session
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `createdAt` (`Date`) - When the service was created
  - `updatedAt` (`Date`) - Last time the service was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the service was deleted

#### `POST /medspas/:medspaId/services` - Create a new service
- Route Params:
  - `:medspaId` - ID of the medspa
- Request Body:
  - `name` (`string`) - Name of the service
  - `description` (string, optional) - description of the service
  - `price` (`number`) - how much the service costs
  - `duration` (`number`) - duration (in seconds) of the service session
- Return Body:
  - `id` (`number`) - ID of the service
  - `name` (`string`) - Name of the service
  - `description` (string | `null`) - description of the service
  - `price` (`number`) - how much the service costs
  - `duration` (`number`) - duration (in seconds) of the service session
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `createdAt` (`Date`) - When the service was created
  - `updatedAt` (`Date`) - Last time the service was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the service was deleted

#### `PATCH /medspas/:medspaId/services/:serviceId` - Updates a service
- Route Params:
  - `:medspaId` - ID of the medspa
  - `:serviceId` - ID of the service
- Request Body:
  - `name` (`string`, optional) - Name of the service
  - `description` (`string`, optional) - description of the service
  - `price` (`number`, optional) - how much the service costs
  - `duration` (`number`, optional) - duration (in seconds) of the service session
- Return Body:
  - `id` (`number`) - ID of the service
  - `name` (`string`) - Name of the service
  - `description` (string | `null`) - description of the service
  - `price` (`number`) - how much the service costs
  - `duration` (`number`) - duration (in seconds) of the service session
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `createdAt` (`Date`) - When the service was created
  - `updatedAt` (`Date`) - Last time the service was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the service was deleted

#### `DELETE /medspas/:medspaId/services/:serviceId` - Deletes a Service
- Route Params:
  - `:medspaId` - ID of the medspa
  - `:serviceId` - ID of the service
- Return Body:
  > *Empty*

### Appointments

#### `GET /medspas/:medspaId/appointments` - List all appointments of a Medspa
- Route Params:
  - `:medspaId` - ID of the medspa
- Query Params:
   - `offset` (`number`) - The page number
   - `limit` (`number`) - The number of items per page
   - `fromId` (`number`) - The id of the last item in the previous page. Can not be used with `offset`
   - `sortBy` (`object`) - An object with the keys being the fields from the medspa object and the values being the sort order (asc or desc)
   - `status` (`'SCHEDULED'` | `'COMPLETED'` | `'CANCELLED'`) - filter the appointments by the status
 - Return Body: Array of:
  - `id` (`number`) - ID of the appointment
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `startTime` (`Date`) - When this appointment starts
  - `totalPrice` (`number`) - how much all services in this appointment costs
  - `totalDuration` (`number`) - total duration (in seconds) of the aggregate of services in this appointment
  - `status` (`'SCHEDULED'` | `'COMPLETED'` | `'CANCELLED'`) - status of the appointment
  - `services` (array of objects) - An array of services to be executed in this appointment:
    - `id` (`number`) - ID of the service
    - `name` (`string`) - name of the service
    - `price` (`number`) - how much the service costs
    - `duration` (`number`) - duration (in seconds) of the service session
  - `createdAt` (`Date`) - When the appointment was created
  - `updatedAt` (`Date`) - Last time the appointment was updated
  - `deletedAt` (`Date` | `null`) - Whether (and when) the appointment was deleted

#### `GET /medspas/:medspaId/appointments/:appointmentId` - Get a single appointment
- Route Params:
  - `:medspaId` - ID of the medspa
  - `:appointmentId` - ID of the appointment
 - Return Body:
  - `id` (`number`) - ID of the appointment
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `startTime` (`Date`) - When this appointment starts
  - `totalPrice` (`number`) - how much all services in this appointment costs
  - `totalDuration` (`number`) - total duration (in seconds) of the aggregate of services in this appointment
  - `status` (`'SCHEDULED'` | `'COMPLETED'` | `'CANCELLED'`) - status of the appointment
  - `services` (array of objects) - An array of services to be executed in this appointment:
    - `id` (`number`) - ID of the service
    - `name` (`string`) - name of the service
    - `price` (`number`) - how much the service costs
    - `duration` (`number`) - duration (in seconds) of the service session
  - `createdAt` (`Date`) - When the appointment was created
  - `updatedAt` (`Date`) - Last time the appointment was updated
  - `deleted` (`Date` | `null`) - Whether (and when) the appointment was deleted

#### `POST /medspas/:medspaId/appointments` - Create a new appointment
- Route Params:
  - `:medspaId` - ID of the medspa
- Request Body:
  - `start` (`Date`) - When the appointment should start
  - `services` (array of objects) - List of services to be associated with this appointment
    - `serviceId` (`number`) - The ID of the service
- Return Body:
  - `id` (`number`) - ID of the appointment
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `startTime` (`Date`) - When this appointment starts
  - `totalPrice` (`number`) - how much all services in this appointment costs
  - `totalDuration` (`number`) - total duration (in seconds) of the aggregate of services in this appointment
  - `status` (`'SCHEDULED'` | `'COMPLETED'` | `'CANCELLED'`) - status of the appointment
  - `services` (array of objects) - An array of services to be executed in this appointment:
    - `id` (`number`) - ID of the service
    - `name` (`string`) - name of the service
    - `price` (`number`) - how much the service costs
    - `duration` (`number`) - duration (in seconds) of the service session
  - `createdAt` (`Date`) - When the appointment was created
  - `updatedAt` (`Date`) - Last time the appointment was updated
  - `deleted` (`Date` | `null`) - Whether (and when) the appointment was deleted

#### `PATCH /medspas/:medSpaId/appointments/:appointmentId` - Updates an appointment
- Route Params:
  - `:medspaId` - ID of the medspa
  - `:appointmentId` - ID of the appointment
- Request Body:
  - `start` (`Date`, optional) - When the appointment should start
  - `status` (`'COMPLETED'` | `'CANCELLED'`, optional) - Change the status of the appointment
- Return Body:
  - `id` (`number`) - ID of the appointment
  - `medSpaId` (`number`) - ID of the parent MedSpa
  - `startTime` (`Date`) - When this appointment starts
  - `totalPrice` (`number`) - how much all services in this appointment costs
  - `totalDuration` (`number`) - total duration (in seconds) of the aggregate of services in this appointment
  - `status` (`'SCHEDULED'` | `'COMPLETED'` | `'CANCELLED'`) - status of the appointment
  - `services` (array of objects) - An array of services to be executed in this appointment:
    - `id` (`number`) - ID of the service
    - `name` (`string`) - name of the service
    - `price` (`number`) - how much the service costs
    - `duration` (`number`) - duration (in seconds) of the service session
  - `createdAt` (`Date`) - When the appointment was created
  - `updatedAt` (`Date`) - Last time the appointment was updated
  - `deleted` (`Date` | `null`) - Whether (and when) the appointment was deleted
