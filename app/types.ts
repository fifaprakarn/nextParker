export interface Breed {
  id: number;
  name: string;
  bred_for?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
}

export interface RegisUser {
  username: string;
  email: string;
  password: string;
}
