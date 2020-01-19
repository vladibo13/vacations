export interface IVacation {
	id: number;
	destination: string;
	from_date: string;
	to_date: string;
	picture: string;
	description: string;
	all_followers?: number;
	cost: number;
	isSelected: boolean;
}

export interface IUser {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	role: string;
}
