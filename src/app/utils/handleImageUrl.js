export const handleImageUrl = url => {
    const cdnImage = `https://res.cloudinary.com/nickolasben/image/fetch/w_450,h_400,c_fill,g_auto/f_auto/${url}`;
    return cdnImage;
};
