
export class Contact {

    constructor(
        public _id?: string,
        public name?: string,
        public email?: string,
        public phone?: string,
        public imgUrl?: string,
        public moves?: []) {

    }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}

