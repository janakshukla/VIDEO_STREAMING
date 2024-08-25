import { Router } from 'express';
import {
   
    getAllVideos,
    getVideoById,
    publishAVideo,

} from "../controllers/video.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
           
            
        ]),
        publishAVideo
    );

router
    .route("/:videoId")
    .get(getVideoById)
 




export default router