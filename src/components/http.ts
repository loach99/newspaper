import { Post } from "./Interface";
type FetchError = {
    message: string;
    code?: number;
};
export const fetchData = ():Promise<Post[]> => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(response => {
                if (!response.ok) {
                    reject("Ошибка при получении данных");
                }
                return response.json();
            })
            .then((data:Post[]) => {
                resolve(data);
            })
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