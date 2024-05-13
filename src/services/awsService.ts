import AWS from 'aws-sdk';

export const S3Uploader = (file: any) => {
    console.log({ file });
    const s3 = new AWS.S3({
        accessKeyId: 'AKIA5MJGXABEROCFDZV6',
        secretAccessKey: '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',
    });

    const params = {
        Bucket: 'food-website-bucket',
        Key: file.name,
        Body: file,
        ACL: 'public-read', // Change this according to your needs
    };

    s3.upload(params, (err: any, data: { Location: any; }) => {
        if (err) {
            console.error('Error uploading file:', err);
            return { err }
        } else {
            console.log('File uploaded successfully:', data.Location);
            return { image: data.Location }
            // Do something with the uploaded file URL
        }
    });

};




