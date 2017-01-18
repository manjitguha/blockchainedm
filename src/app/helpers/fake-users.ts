import { User } from '../models/index';

export const USERS: User[] = [
    {
        username: 'johnsmith', password: 'password', firstName: 'John', lastName: 'Smith', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/provider'
        }
    },
    {
        username: 'ajohnson', password: 'password', firstName: 'Angella', lastName: 'Johnson', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/payer'
        }
    },
    {
        username: 'fdcosta', password: 'password', firstName: 'Fransis', lastName: 'Dcosta', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/patient'
        }
    },
    {
        username: 'ghohpe', password: 'password', firstName: 'Gregor', lastName: 'Hohpe', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/pharmacy'
        }
    },
    {
        username: 'egamma', password: 'password', firstName: 'Erich', lastName: 'Gamma', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/secretory'
        }
    },
    {
        username: 'rjohnson', password: 'password', firstName: 'Ralph', lastName: 'Johnson', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/lab'
        }
    },
    {
        username: 'rhelm', password: 'password', firstName: 'Richard', lastName: 'Helm', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/provider'
        }
    },
    {
        username: 'jvlissides', password: 'password', firstName: 'John', lastName: 'Vlissides', organization: {
            orgName: 'SAINT FRANCIS MEDICAL GROUP INC',
            orgDescription: 'GROUP PRACTICE',
            homeURL: '/provider'
        }
    }
];