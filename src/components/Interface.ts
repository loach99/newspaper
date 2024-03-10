export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ComponentProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean;
}