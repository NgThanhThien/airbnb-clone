export interface UserModel {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null | undefined;
  image: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
}
