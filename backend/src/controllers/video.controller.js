import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {ApiError} from "../utills/ApiError.js"
import {ApiResponse} from "../utills/ApiResponse.js"
import {asyncHandler} from "../utills/asyncHandler.js"
import {uploadOnCloudinary} from "../utills/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10} = req.query
    let getAllVideo;
    try {
        getAllVideo = Video.aggregate([
            {
                $sample: {
                    size: parseInt(limit),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "details",
                    pipeline: [
                        {
                            $project: {
                                fullname: 1,
                                username: 1,
                            },
                        },

                    ],
                },
            },

            {
                $addFields: {
                    details: {
                        $first: "$details",
                    },
                },
            },
        ]);
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Videos !!"
        );
    }

    const result = await Video.aggregatePaginate(getAllVideo, { page, limit });

    if (result.docs.length == 0) {
        return res.status(200).json(new ApiResponse(200, [], "No Video Found"));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, result.docs, "Videos fetched Succesfully !")
        );

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body;

   
    const videoFileLocalPath = req.files?.videoFile[0]?.path;

    if (
        [title, description, videoFileLocalPath].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All field are required!");
    }

   
    const videoFile = await uploadOnCloudinary(videoFileLocalPath);

   

    if (!videoFile) {
        throw new ApiError(400, "VideoFile link is required");
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        title,
        description,
        duration: videoFile.duration,
        isPublished: true,
    });

    if (!video) {
        throw new ApiError(
            500,
            "Something went wrong while uploading the video."
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video published succesfully."));
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: get video by id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid VideoID.");
    }

    const responce = await Video.findById(videoId);

    console.log("Printing responce of updateVideo: ", responce);
    if (!responce) {
        throw new ApiError(400, "Failed to get Video details.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, responce, "Video details fetched succesfully.")
        );
})





export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    
}