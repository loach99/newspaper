import { FunctionComponent, useEffect, useState } from "react"
import styles from './PostsPage.module.css'
import { Link, Outlet } from "react-router-dom";
import { Post } from "../Interface";
interface ComponentProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostPage: FunctionComponent<ComponentProps> = ({ setIsActive }) => {

    const initialPosts: Post[] = [
        {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        }

    ];
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])
    return (
        <div className={styles.postWrap}>
            <Outlet />
            <div className={styles.container}>
                {posts.map((post: Post) => {
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
                })}
            </div>
        </div>

    );
}

export default PostPage;