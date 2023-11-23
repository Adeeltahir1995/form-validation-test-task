interface User  {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
    gender: 'male' | 'female' | 'other';
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    city: string;
    professionalSkills: string[];
  };


  export type {
    User
  }