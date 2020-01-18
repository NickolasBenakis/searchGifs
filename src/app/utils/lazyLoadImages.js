export default () => {
    // let lazyBackgrounds = [].slice.call(
    //     document.querySelectorAll('.lazy-load')
    // );
    let lazyBackgrounds = Array.from(document.querySelectorAll('.lazy-load'));
    console.log(lazyBackgrounds);

    if ('IntersectionObserver' in window) {
        let lazyBackgroundObserver = new IntersectionObserver(
            function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const imageSrc = entry.target.attributes[1].value.substring(
                            0
                        );
                        entry.target.style.backgroundImage = imageSrc;
                        lazyBackgroundObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px 0px 256px 0px'
            }
        );

        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
};
