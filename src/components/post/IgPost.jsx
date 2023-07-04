import "./App.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare, FiBookmark } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useState } from "react";
import React from "react";
import {BsFillBookmarkFill} from "react-icons/bs";
import {OverlayTest as ShowOverlay} from "./overlay";
import { useMediaQuery } from 'react-responsive'

const accountIndex = 0;
const account = {
  name: 'Pushkar Mishra',
  id: 'pushkarm029',
  url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  description: 'Full Stack Web Developer | 18 | Fresher @ BITS Pilani https://github.com/@pushkarm029',
  followers: '452',
  following: '77',
  posts: [{
      number: '1',
      imageurl: 'https://plus.unsplash.com/premium_photo-1681987448291-1e5985657c0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80?width=400&height=400',
      likes: '10',
      caption: 'Hello Hello Kon rabb Deep',
      comment: 'Nice Project'
  },{
    number: '2',
    imageurl: 'https://images.unsplash.com/photo-1682337743362-ad67a2248b07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    likes: '1M',
    caption: 'Hello Hello Kon rabb Deep',
    comment: 'Nice Project'
  },{
    number: '3',
    imageurl: 'https://images.unsplash.com/photo-1682687981922-7b55dbb30892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    likes: '14',
    caption: 'Hello Hello Kon rabb Deep',
    comment: 'Nice Project'
  },{
    number: '4',
    imageurl: 'https://plus.unsplash.com/premium_photo-1663954866095-373f8c814417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    likes: '1B',
    caption: 'Hello Hello Kon rabb Deep',
    comment: 'Nice Project'
  },{
    number: '5',
    imageurl: 'https://images.unsplash.com/photo-1682977821515-ec343a4862c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likes: '1T',
    caption: 'Hello Hello Kon rabb Deep',
    comment: 'Nice Project'
  }]
}

function randomizeHomePosts(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function randomNumberToShowPosts(num) {
  return Math.floor(Math.random() * num);
}

function CheckUsername(text) {
  let length = text.length;
  if (length >= 11) {
    return text.slice(0, 8) + "...";
  } else {
    return text;
  }
}

function HomeLike({ liked, onClick}) {
  if (liked) {
    return <AiFillHeart onClick={onClick} size={25} color="#FF3040" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
  }
  return <AiOutlineHeart onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

function HomeBookmark({ bookmark, onClick}) {
  if (bookmark) {
    return <BsFillBookmarkFill onClick={onClick} size={22} color="white" style={{  paddingRight: '8px', paddingTop: '7px', paddingBottom: '7px' }} />
  }
  return <FiBookmark onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

function LikeMeter ({accountId, postNumber, likeCount, likedImages}){
  let likeCountinLikeMeter = likeCount;
  const imageId = `${accountId}+${postNumber}`;
  if (likedImages.includes(imageId)) {
    return <p className="homeLikeMeter">{++likeCountinLikeMeter} Likes</p>; 
  } else {
    return <p className="homeLikeMeter">{likeCountinLikeMeter} Likes</p>;
  }
};

// storing all props as array in a state then passing it to the overlay component is a good idea for now

export default function Body() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  // const [randomizedAccountList, setRandomizedAccountList] = useState(randomizeHomePosts(account));
  // const [randomizedStoryList, setRandomizedStoryList] = useState(randomizeHomePosts(account));
  const [randomizedNumber, setRandomizedNumber] = useState(randomNumberToShowPosts(3));
  const [ShowOverlayState, setShowOverlayState] = useState([false, "", "", "", ""]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID] = ShowOverlayState;
  

  const handleOverlayStateChange = () => {
    setShowOverlayState(prevState => [!prevState[0], ...prevState.slice(1)]);
  };


  // later i want a add a algo so it finds a random value between posts.length(of a particular account(inside a map)) and 0
  const [likedImages, setLikedImages] = useState([]);
  const[bookmark, setBookmark] = useState([]);
  const handleDoubleClick = (accountId, postNumber) => {
    const likedImage = `${accountId}+${postNumber}`;
    setLikedImages(prevLikedImages => [...prevLikedImages, likedImage]);
  };
  const handleClick = (accountId, postNumber) => {
    const imageId = `${accountId}+${postNumber}`;
    if (likedImages.includes(imageId)) {
      setLikedImages(prevLikedImages => prevLikedImages.filter(image => image !== imageId)); 
    } else {
      setLikedImages(prevLikedImages => [...prevLikedImages, imageId]);
    }
  };
  const handleBookmark = (accountId, postNumber) => {
    const bookmarkId = `${accountId}+${postNumber}`;
    if (bookmark.includes(bookmarkId)) {
      setBookmark(prevBookmarkImages => prevBookmarkImages.filter(image => image !== bookmarkId)); 
    } else {
      setBookmark(prevBookmarkImages => [...prevBookmarkImages, bookmarkId]);
    }
  };

  // const handleOverlay = (ShowOverlayState,) => {};
  return (
    <div className="body">
      {showOverlay && <ShowOverlay onStateChange={handleOverlayStateChange}  OverAcID={overlayId} OverAcCaption={overlayCaption} OverAcLikes={overlayLikes} OverAcImages={overlayImageID} />}
      {/* <div className="stories">
        {randomizedStoryList.slice(0, 8).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.name} />
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div> */}
      <div className="posts">
       
          <div className="post" key={account.id}>
              {account.posts.length > 0 ? (
                <div className="individualpost" key={account.posts[randomizedNumber].number}>
                  <div className="postheader">
                    <div className="postheaderpartone">
                      <img src={account.url} alt={account.id} />
                      <p className="postheadertopid">{account.id}</p>
                      <p className="postheadertopduration">· 1 d</p>
                    </div>
                    <FiMoreHorizontal color="white" size={20} />
                  </div>
                  <div key={account.posts[randomizedNumber].number}>
                    <div
                      onDoubleClick={() => handleDoubleClick(account.id, account.posts[randomizedNumber].number)}
                      className="postimage"
                    >
                      <img src={account.posts[randomizedNumber].imageurl} 
                        alt="" 
                      />
                    </div>
                    <div className="interactablepost">
                      <div className="interactablepostleft">
                        <HomeLike onClick={() => handleClick(account.id, account.posts[randomizedNumber].number)} liked={likedImages.includes(`${account.id}+${account.posts[randomizedNumber].number}`)} />
                        <FiMessageSquare
                          onClick={() => setShowOverlayState([true, account.id, account.posts[randomizedNumber].caption, account.posts[randomizedNumber].likes, account.posts[randomizedNumber].imageurl])}
                          size={25}
                          color="white"
                          style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }}
                        />       
                        <RiShareForwardLine size={25} color="white" style={{ paddingLeft: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      </div>
                      <div className="interactablepostright">
                        <HomeBookmark onClick={() => handleBookmark(account.id, account.posts[randomizedNumber].number)} bookmark={bookmark.includes(`${account.id}+${account.posts[randomizedNumber].number}`)}/>
                      </div>
                    </div>
                    <div className="postfooter">
                      <LikeMeter accountId={account.id} postNumber={account.posts[randomizedNumber].number} likeCount={account.posts[randomizedNumber].likes} likedImages={likedImages} />
                      <div className="postfootercaption">
                        <p className="postFooterAccountName">{account.name}</p>
                        <p className="postFooterAccountCaption">{account.posts[randomizedNumber].caption}</p>
                      </div>
                      <p>1 comment</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No post available</p>
              )}
          </div>
      </div>
    </div>
  );
}