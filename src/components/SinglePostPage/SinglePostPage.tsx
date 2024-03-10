import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './SinglePostPage.module.css';
import { Post, SinglePostProps } from "../Interface";
import { fetchDataPostId } from "../http";

const SinglePostPage: FunctionComponent<SinglePostProps> = ({ setIsActive, isActive }) => {

    const initialPosts: Post = {
        userId: 1,
        id: 1,
        title: "",
        body: ""
    };
    const { id } = useParams<string>();
    const [post, setPost] = useState<Post>(initialPosts);
    const navigate = useNavigate();
    const closeModal = (): void => {
        setIsActive(false);
        navigate('/');
    };
    useEffect(() => {
        fetchDataPostId(id === 'newspaper'?'/':id)
            .then((data) => setPost(data))
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    }, [id]);

    return (
        <div onClick={() => closeModal()} className={isActive ? styles.postModalActive : styles.postModalUnActive}>
            <div className={styles.postContainer}>
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
                {post.body ?
                    <div className={styles.postContent}>
                        <div className={styles.postTitle}>{post.title}</div>
                        <div className={styles.postBody}>{post.body}</div>
                    </div> : <p className={styles.loader}>Loading...</p>}
            </div>
        </div>
    );
}

export default SinglePostPage;