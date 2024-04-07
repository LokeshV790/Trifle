import { faBookmark, faEnvelope, faHeart, faImage, faMessage, faPaperPlane, faUser } from "@fortawesome/free-regular-svg-icons";
import {   faEllipsisH, faFeatherPointed, faHouse, faPlus, faRetweet, faSearch, faWandMagicSparkles, faHeart as faHeartFilled, faBookmark as faBookmarkFilled, faSpinner, faArrowLeft, faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const icons = {
    home: <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>,
    search: <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>,
    messages: <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>,
    profile: <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>,
    feather: <FontAwesomeIcon icon={faFeatherPointed} ></FontAwesomeIcon>,
    ellipsis: <FontAwesomeIcon icon={faEllipsisH} ></FontAwesomeIcon>,
    plus : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
    wand: <FontAwesomeIcon icon={faWandMagicSparkles}></FontAwesomeIcon>,
    media: <FontAwesomeIcon icon={faImage} ></FontAwesomeIcon>,
    comments: <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>,
    retweet: <FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon>,
    heart: <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>,
    heart_filled: <FontAwesomeIcon icon={faHeartFilled}></FontAwesomeIcon>,
    bookmark : <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>,
    bookmark_filled: <FontAwesomeIcon icon={faBookmarkFilled}></FontAwesomeIcon>,
    spinner: <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>,
    plane: <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>,
    arrow: <FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon>,
    spinner: <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>,
    arrow_up_left: <FontAwesomeIcon icon={faArrowsSplitUpAndLeft}></FontAwesomeIcon>

}