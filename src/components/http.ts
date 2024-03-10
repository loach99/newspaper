import { Post } from "./Interface";
type FetchError = {
    message: string;
    code?: number;
};
export const fetchData = (currentPage:number,setFetching:React.Dispatch<React.SetStateAction<boolean>>):Promise<Post[]> => {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
            .then(response => {
                if (!response.ok) {
                    reject("Ошибка при получении данных");
                }
                return response.json();
            })
            .then((data:Post[]) => {
                resolve(data);
            })
            .finally(()=>setFetching(false))
            .catch((error:FetchError) => {
                reject(error);
            });
    });
};

export const fetchDataPostId = (id:string|undefined):Promise<Post> => {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                if (!response.ok) {
                    reject("Ошибка при получении данных");
                }
                return response.json();
            })
            .then((data:Post) => {
                resolve(data);
            })
            .catch((error:FetchError) => {
                reject(error);
            });
    });
};  