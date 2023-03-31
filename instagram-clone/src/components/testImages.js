import follower from "../assets/testImages/rosie.jpg";
import follower2 from "../assets/testImages/dot.jpg";
import follower3 from "../assets/testImages/flick.jpg";
import follower4 from "../assets/testImages/heimlich.jpg";
import follower5 from "../assets/testImages/hopper.jpg";
import follower6 from "../assets/testImages/night.jpg";
import post from '../assets/testImages/rockWall.jpg'
import post1 from '../assets/testImages/rockWallBlack.jpg'
const testImgArr = [
    {username:'rosie',img:follower},
    {username:'dot',img:follower2, post:post },
    {username:'flick',img:follower3, post:post1},
    {username:'heimlich',img:follower4,post:post},
    {username:'hopper',img:follower5},
    {username:'rosie',img:follower},
    {username:'dot',img:follower2, post:post },
    {username:'flick',img:follower3, post:post1},
    {username:'heimlich',img:follower4,post:post},
    {username:'hopper',img:follower5},
    {username:'night',img:follower6}
]

    const testPostArr = [
        {username:'dot',img:follower2, post:post },
        {username:'flick',img:follower3, post:post1},
        {username:'heimlich',img:follower4,post:post}]

export { testImgArr, testPostArr};
