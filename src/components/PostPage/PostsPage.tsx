import { FunctionComponent, useEffect, useState } from "react"
import styles from './PostsPage.module.css'
import { Link, Outlet } from "react-router-dom";
import { Post } from "../Interface";
import { fetchData } from "../http";
import {PostPageProps} from '../Interface'

const PostPage: FunctionComponent<PostPageProps> = ({ setIsActive }) => {

    const initialPosts: Post[] = [
        {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        }

    ];
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        if (fetching) {
            fetchData(currentPage, setFetching)
                .then((data) => {
                    setPosts([...posts, ...data]);
                    setCurrentPage(prevState => prevState + 1)
                })
                .catch(error => {
                    console.error('Произошла ошибка:', error);
                });
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    const scrollHandler = (e:Event): void => {
        if ((e.target as Document).documentElement.scrollHeight - ((e.target as Document).documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }  
    }
    return (
        <div className={styles.postWrap}>
            <Outlet />
            <div className={styles.container}>
                {posts.length != 1 ? (<>
                    {posts.slice(1).map((post: Post) => {
                        return (
                            <div className={styles.postContainer} key={post.id}>
                                <div className={styles.postHeader}>
                                    <a href="">
                                        <div className={styles.avatarPost}>
                                        </div>
                                    </a>
                                    <div className={styles.postHeaderInfo}>
                                        <div className={styles.postHeaderInfoName}>Name Surname</div>
                                        <div className={styles.postHeaderInfoTime}>16:33</div>
                                    </div>
                                </div>
                                <div className={styles.postContent}>
                                    <div className={styles.postTitle}>{post.title}</div>
                                    <Link to={`/${post.id}`} onClick={() => setIsActive(true)} className={styles.showAllPost}>show more</Link>
                                </div>
                            </div>
                        )
                    })}</>) : (<p className={styles.loader}>Loading...</p>)}
            </div>
        </div>
    );
}

export default PostPage;