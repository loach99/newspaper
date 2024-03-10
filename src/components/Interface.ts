export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface SinglePostProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean;
}
export interface PostPageProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
