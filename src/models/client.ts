export class Client {

    public isDeleting: boolean;
    
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public identification: string,
        public birthDate: Date,
        public address: string,
        public phone1: string,
        public phone2: string,
        public mobilePhone: string,
        public email: string,
        public age: number,
        public avatar: string) {}

    public static copyFrom(other: any) {
        var birthDate = typeof other.birthDate === "Date"? other.birthDate : new Date(other.birthDate);
        return new Client(
            other.id, 
            other.firstName, 
            other.lastName,
            other.identification,
            birthDate,
            other.address,
            other.phone1,
            other.phone2,
            other.mobilePhone,
            other.email,
            other.age,
            other.avatar);
    }
}