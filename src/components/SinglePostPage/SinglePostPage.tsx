import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './SinglePostPage.module.css';
import { Post, ComponentProps } from "../Interface";

const SinglePostPage: FunctionComponent<ComponentProps> = ({ setIsActive, isActive }) => {

    const initialPosts: Post = {
        userId: 1,
        id: 1,
        title: "",
        body: ""
    };
    const { id } = useParams<string>();
    const [post, setPost] = useState<Post>(initialPosts);
    const navigate = useNavigate();
    const closeModal = ():void => {
        setIsActive(false);
        navigate('/');
    }
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
    }, [id])

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
                <div className={styles.postContent}>
                    <div className={styles.postTitle}>{post.title}</div>
                    <div className={styles.postBody}>{post.body}</div>
                </div>
            </div>
        </div>
    );
}

export default SinglePostPage;