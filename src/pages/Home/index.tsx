import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { HandThumbUpIcon, HomeIcon } from '@heroicons/react/20/solid';
import { CameraIcon,
        FaceSmileIcon,
        MapPinIcon,
        PaperClipIcon,
        PhotoIcon,
        ChatBubbleLeftEllipsisIcon,
        ShareIcon,
        ClockIcon } from '@heroicons/react/24/outline';

import "./styles.css";

interface userType {
  name: string,
  user: string,
  birthdate: Date | string,
  email: string,
  password: string,
  profile_photo: string
}

interface postType {
  user: string,
  post_date: Date | string,
  description: string,
  likes: number,
  comments: commentType[],
  url_imagem: string
}

interface commentType {
  user: string,
  comment: string
}

interface authType {
  name: string,
  profile_photo: string
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [posts, setPosts] = useState<postType[]>([]);
  const [comments, setComments] = useState<commentType[]>([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  const auth: authType[] = JSON.parse(localStorage.getItem('userAuth')!);

  console.log(auth[0].name);

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/user`);
    const data = await response.json();
    setUsers(data.users);
    console.log(data.users);
  };

  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/user/post`);
    const data = await response.json();
    setPosts(data.posts);
    console.log(data.posts);
  };
  
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const handleFormPost = (e: FormEvent) => {
    e.preventDefault();

    const newPostUser: string = auth[0].name;
    const newPostPic: string = auth[0].profile_photo;

    const post = {
      user: newPostUser,
      post_date: new Date(),
      description: newPost,
      likes: 0,
      comments: [],
      url_imagem: newPostPic
    }
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleNewPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("");

    setNewPost(e.target.value);
  };

  const handleFormComment = (e: FormEvent) => {
    e.preventDefault();

    const newCommentUser: string = auth[0].name;

    const comment = {
      user: newCommentUser,
      comment: newComment
    }

    setComments([comment, ...comments]);
    setNewComment("");
  }

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("");
    
    setNewComment(e.target.value);
  }

  return (
    <div className='ContainerHome'>

      <div className='LogoContent'>
        <img
          src={require('../../assets/img/logo.png')}
          alt="Compass Logo"
        />
      </div>

      <div className='ContentWrap'>

        <div className='HomeContent'>
          <div className='HomeText'>
            <HomeIcon />
            Home
          </div>
          <div className='NomeText'>
            <img src={auth[0].profile_photo} alt="Foto de Pessoa" />
            {auth[0].name}
          </div>
        </div>

        <form onSubmit={handleFormPost} className='SendContent'>
          <div className='divText'>
            <img src={auth[0].profile_photo} alt="Foto de Pessoa" />
            <textarea
              name='newpost'
              title='post'
              value={newPost}
              onChange={handleNewPost}
              placeholder='No que você está pensando?'
            ></textarea>
          </div>
          <div className='divPost'>
            <div className='Icons'>
              <CameraIcon />
              <PhotoIcon />
              <PaperClipIcon />
              <MapPinIcon />
              <FaceSmileIcon />
            </div>
            <button type='submit' className='SendPost'>Postar</button>
          </div>
        </form>

        {posts.map(
          (post, i) => {
            return <div className='PostContent' key={post.description}>
          <div className='PostPerson'>
            <div>
              <img src={post.url_imagem ?? require("../../assets/img/friend.jpg")} alt="Foto de quem Postou" />
              <p>{post.user}</p>
              <p className='PostTimeText'>
                <span><ClockIcon />{new Date(post.post_date).toLocaleString()} em</span> Paisagens Exuberantes
              </p>
            </div>
          </div>
          <div className='PostImage'>
            <p>
              {post.description}
            </p>
            <img src={require("../../assets/img/paisagem.jpg")} alt="Foto da Postagem" />
          </div>
          <div className='PostIcon'>
            <div className='PostLike'>
              <HandThumbUpIcon />
              <p>Curtiu <span>{post.likes}</span></p>
            </div>
            <div className='PostComment'>
              <ChatBubbleLeftEllipsisIcon />
              <p>Comentários <span>{post.comments ? post.comments.length : 0}</span></p>
            </div>
            <div className='PostShare'>
              <ShareIcon />
              Compartilhar
            </div>
          </div>
          <form onSubmit={handleFormComment} className='PostForm'>
            <img src={auth[0].profile_photo} alt="Foto da Pessoa" />
            <textarea
              name='newcomment'
              title='comment'
              value={newComment}
              onChange={handleNewComment}
              placeholder='O que você está pensando?'
            ></textarea>
            <div className='IconsSmall'>
              <CameraIcon />
              <PhotoIcon />
              <PaperClipIcon />
              <MapPinIcon />
              <FaceSmileIcon />
            </div>
            <button type='submit' className='SendPost'>Postar</button>
          </form>
          <div className='PostComments'>
            <p className='LabelAllComments'>Todos os comentários</p>
            {post.comments && post.comments.map(
              (comment: commentType, i) => { 
                return <div className='PostCommentsPerson' key={comment.comment}>
              <img src={require("../../assets/img/friend.jpg")} alt="Foto de quem comentou" />
              <p>
                <span>{comment.user}: </span>
                {comment.comment}
              </p>
            </div>
            }
            )}
            <hr />
            <div className='PostAllComments'>
              <p>Ver todos os comentários</p>
            </div>
          </div>
        </div>
          }
        )}

        <div className='OtherWrap'>
          <div className='FriendsContent'>
            Meus Amigos
            <div className='Friends'>
              <ul className='FriendsList'>
                {users.map(
                  (user, i) =>
                <li className='FriendsText' key={i}>
                  <img src={require("../../assets/img/friend.jpg")} alt="Foto de Amigo" />
                  <p>{user.name}</p>
                </li>
                )}
              </ul>
            </div>
          </div>
          <div className='OtherContent'></div>
          <div className='OtherContent'></div>
        </div>

      </div>
      
    </div>
  );
}

export default Home;