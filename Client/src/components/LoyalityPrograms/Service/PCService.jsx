export const PCService = {
    getPCData() {
        return [
            {
                id: '1',
                name: 'XFO12',
                age: '23',
                gender: 'Male',
                reduction: 20,
                status:true
            },
            {
                id: '2',
                name: 'XFO16',
                age: '55',
                gender: 'Female',
                reduction: 10,
                status:false
            },
            {
                id: '3',
                name: 'XFO13',
                age: '18',
                gender: 'Male',
                reduction: 50,
                status:false
            },
            {
                id: '4',
                name: 'XFO19',
                age: '20',
                gender: 'Female',
                reduction: 44,
                status:true
            },
              
                
        ];
    },
    // getPCMini() {
    //     return Promise.resolve(this.getPCData().slice(0, 5));
    // },

    // getPCSmall() {
    //     return Promise.resolve(this.getPCData().slice(0, 10));
    // },

    getPC() {
        return Promise.resolve(this.getPCData());
    }

};
