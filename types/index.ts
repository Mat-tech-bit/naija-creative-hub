export type UserRole = "admin" | "contestant" | "voter";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  photoURL?: string;
  phoneNumber?: string;
}

export interface ContestantProfile extends UserProfile {
  role: "contestant";
  stageName: string;
  category: string;
  bio: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  votes: number;
}
