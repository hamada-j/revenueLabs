# revenueLabs

It is a small application that fetch data in json format form external api. The data is handled internally by a rest full api in NodeJS and Express framework and SQL in cloud with MySQL database and front is Angular-13 app.

### Description

This is a technical test that consists of two parts, the creation of a small app and the code review.

## revenueLabs App

It possible to run this app locally with in project or with docker compose. For this clone the code form github or download the zip. It is necessary to have installed NodeJS(+12), AngularCLI, Git. Optionally Docker.

#### Navigate to the folder:

- `$ cd revenueLabs`

#### Within the folder run the following command:

- `revenueLabs/$ docker-compose build`
- `revenueLabs/$ docker-compose up`

#### Ones is done, in browser navigate to http://localhost:4200/

### revenueLabs_back

After clone the repository or download to run the app locally with npm o run test.

#### Navigate to the folder of revenueLabs_back in revenueLabs, instal dependencies from npm, run the test with script or star the server:

- ` $ revenueLabs/ cd revenueLabs_back`
- `$ npm i`
- `$ npm run test`
- `$ npm run dev`

### revenueLabs_front

To run the front side with angular, it is necessary download the dependencies from npm and that the back en wil run in other terminal to get access.

#### Navigate to the folder of revenueLabs_front in revenueLabs, instal dependencies from npm, run ng command :

- ` $ revenueLabs/ cd revenueLabs_front`
- `$ npm i`
- `$ ng server -o`

## reviewCode

**Code review** :

- Respect the lines and spaces, to follow an order and a pattern throughout the code.

```javascript
export async function resendOfferCustomer(req: any, res: express.Response) {

    db.HotelRequest.findAll({

        where: { offerToCustomerEmailCount: { [Op.between]: [1, 2] } },
        attributes: ["id"],
        include: [
            {
            model: db.TripRequest,
            where: { cancelled: false },
            required: true,
            },
        ],

    }).then().catch()
```

- Structures of the brackets, etc. Because it allows a faster reading and to see the beginning and end of a function, object, etc.

```javascript
                {
                    model: db.Destination,
                    attributes: ["code"],
                    include: [
                        {
                            model: db.I18NDestination,
                            attributes: ["name"],
                            where: { lang },
                            required: false,
                        },
                    ],
                },
            ],
        },
    ],
}

```

- Sort exports and dependencies, to locate and standardize the code in general.

```javascript
import * as moment from "moment";
import * as mailer from "../util/mailer";
import * as options from "./optionsFindByPk";

import { db } from "../../db/database";
import { diffMoment } from "./diffMoment";
```

- Extract and make independent:

1. Large objects, to saturate the code better.
2. Reusable functions and their dependencies in a separate file, and avoid rewriting code more than once. In Utils folder.
3. Independent methods.

```
revenueLabs
 |
 +-- reviewCode
     |
     +--
        diffMoment.js
        optionsFindByPk.js
        resendOfferCustomer.js
 |
 docker-compose.yml
 unLICENSE
 .gitignore
 README.md
```
