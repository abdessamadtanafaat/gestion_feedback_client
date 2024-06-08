export const MBWinnersService = {
    getMBWinnersData() {
        return [
            {
                id: '1',
                winner: 'Ahmed',
                prize: 'Car',
                email: 'Ahmed@gmail.com',          
                tel:"+212659670848",
                winDate: '18/12/2022',
                pickedUp:true,
            }, {
                id: '2',
                winner: 'Sarah',
                prize: 'Holiday Package',
                email: 'Sarah@example.com',          
                tel: '+1234567890',
                winDate: '20/01/2023',
                pickedUp: false,
              },
              {
                id: '3',
                winner: 'John',
                prize: 'Smartphone',
                email: 'john.doe@mail.com',          
                tel: '+9876543210',
                winDate: '10/03/2023',
                pickedUp: true,
              },{
                id: '4',
                winner: 'Leo',
                prize: 'WIFI',
                email: 'leo.doe@mail.com',          
                tel: '+9876543210',
                winDate: '10/03/2023',
                pickedUp: true,
              },{
                id: '5',
                winner: 'Sami',
                prize: 'PC',
                email: 'john.doe@mail.com',          
                tel: '+9876543210',
                winDate: '10/03/2023',
                pickedUp: false,
              },{
                id: '6',
                winner: 'Karim',
                prize: 'Bimo',
                email: 'john.doe@mail.com',          
                tel: '+9876543210',
                winDate: '10/03/2023',
                pickedUp: true,
              },
              {
                id: '48',
                winner: 'Emily',
                prize: 'Fitness Tracker',
                email: 'emily@testmail.com',          
                tel: '+15556667777',
                winDate: '02/07/2023',
                pickedUp: false,
              },
              {
                id: '49',
                winner: 'David',
                prize: 'Gift Voucher',
                email: 'david@example.org',          
                tel: '+1234432155',
                winDate: '12/09/2023',
                pickedUp: true,
              },
              {
                id: '50',
                winner: 'Sophia',
                prize: 'Headphones',
                email: 'sophia@mail.com',          
                tel: '+9988776655',
                winDate: '25/11/2023',
                pickedUp: false,
              }
            
           
           
                
        ];
    },
    getMBWinnersMini() {
        return Promise.resolve(this.getMBWinnersData().slice(0, 5));
    },

    getMBWinnersSmall() {
        return Promise.resolve(this.getMBWinnersData().slice(0, 10));
    },

    getMBWinners() {
        return Promise.resolve(this.getMBWinnersData());
    }

};

