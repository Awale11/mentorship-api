// waa logicii file-ka upload-gareenaaye
import { success } from "zod";
import cloudinary from "../utils/cloudinary.js";

export const uploadFile = (req, res, next)=> {
    if(!req.file) {
        return res.status(400).json({message: 'No file uploaded'})
    }

        const stream = cloudinary.uploader.upload_stream(
        {folder: 'dugsiiye_uploads', resource_type: 'auto'},
        (error, result)=> {
            if(error) return next(error);
            // hadeesan cilad jirin
            return res.status(201).json({
                success: true,
                // url-ka ayan user-ka ucelinaynaa
                fileUrl: result.secure_url
            })
        }
    )

    // file-ka halkan ayan ugu paaasaynaa
    stream.end(req.file.buffer)
    //buffer-fileka waxa losii gudbinaa uploadController file. controlller-ka waxan dhahayna buffer-ka upload garee
}

