export const CAmbService = {
    getCAmbData() {
        return [
            {
                id: '1',
                name: 'XFO12',
                age: '23',
                gender: 'Male',
                amount:5000,
                email:"xxx@gmail.com"            },
            {
                id: '2',
                name: 'XFO16',
                age: '55',
                gender: 'Female',
                amount:5000,
                    email:"xxx@gmail.com"
            },
            {
                id: '3',
                name: 'XFO13',
                age: '18',
                gender: 'Male',
                amount:5000,
                    email:"xxx@gmail.com"
            },
            {
                id: '4',
                name: 'XFO19',
                age: '20',
                gender: 'Female',
                amount:5000,
                email:"xxx@gmail.com"            },
           
                
        ];
    },
    getCAmbMini() {
        return Promise.resolve(this.getCAmbData().slice(0, 5));
    },

    getCAmbSmall() {
        return Promise.resolve(this.getCAmbData().slice(0, 10));
    },

    getCAmb() {
        return Promise.resolve(this.getCAmbData());
    }

};

