export class User {
	constructor(
		public id: number,
		public nombre: string,
		public email: string,
		public password: string,
		public tipo: string,
		public remember_token: string,
		public created_at: string,
		public updated_at: string
    ) {}
    }
