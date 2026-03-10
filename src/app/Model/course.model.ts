
export interface Course {
    _id?: string;  // optional since backend may generate it
    city: string;
    state: string;
    category: string;
    price: number;
    courseDate: Date;
    timeSlot: string[];
};