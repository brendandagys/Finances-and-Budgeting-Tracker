import AWS from 'aws-sdk'
import asyncHandler from 'express-async-handler'

AWS.config.update({
  region: 'ca-central-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const s3Upload = asyncHandler((req, res) => {
  const s3 = new AWS.S3()

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.fileName,
    Expires: 500,
    ContentType: req.body.fileType,
    ACL: 'public-read',
  }

  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (error, data) => {
    if (error) {
      console.error(error)
      res.json({ success: false, error })
    }

    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      receiptUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.body.fileName}`,
    }
    // Send it all back
    res.json({ success: true, data: { returnData } })
  })
})

export const s3Delete = asyncHandler((req, res) => {
  const s3 = new AWS.S3()

  s3.deleteObject(
    { Bucket: process.env.AWS_BUCKET_NAME, Key: req.body.key },
    (error, data) => {
      if (error) {
        console.error(error)
        res.json({ success: false, error })
      }

      res.json({ success: true })
    }
  )
})
