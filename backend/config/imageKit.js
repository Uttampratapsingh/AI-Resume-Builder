import ImageKit from '@imagekit/nodejs';

const imageKit = new ImageKit({ // Create a new instance of ImageKit with the necessary configuration
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

export default imageKit; // Export the ImageKit instance for use in other parts of the application