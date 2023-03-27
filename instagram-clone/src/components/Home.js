import "../styles/Home.css";
import testImgArr from "./testImages";

const Home = () => {
    
  return (
    <div className="Home">
      <div className="feed">
        <div className="followers">
          {testImgArr.map((el, i)=> {
            return(
                <div className='follower' data-id={i}> 
                    <div className="followerImg"><img src={el.img}/></div>
                    <div>{el.username}</div>
                </div>
            )
          })}
        </div>
        <div className="posts">
        <div><h1>Home</h1></div>
          <div>test</div>
          <div>anoterh test</div>
        </div>
      </div>
      <div className="right">
        right bar
        <div className="suggestions">Suggestions For You
        <div>person</div>
        <div>person2</div>
        <div>person3</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
