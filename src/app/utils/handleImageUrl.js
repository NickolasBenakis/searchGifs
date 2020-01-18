export const handleImageUrl = url => {
    const cdnImage = `https://res.cloudinary.com/nickolasben/image/fetch/w_300,h_300,c_fill,g_auto/f_auto/${url}`;
    return cdnImage;
};
