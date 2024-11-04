// src/components/ContentHome.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBanner, getServices } from '../api/user';
import SkeletonLoader from './SkeletonLoader';
import ImageSlider from './ImageSlider';

const ContentHome = () => {
    const [banners, setBanners] = useState([]);
    const [menus, setMenus] = useState([]);
    const [loadingBanners, setLoadingBanners] = useState(true);
    const [loadingMenus, setLoadingMenus] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingBanners(true);
                setLoadingMenus(true);

                const banner = await getBanner();
                setBanners(banner);
                setLoadingBanners(false);

                const menu = await getServices();
                setMenus(menu);
                setLoadingMenus(false);
            } catch (error) {
                console.error(error);
                setLoadingBanners(false);
                setLoadingMenus(false);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="flex px-4 md:px-0 my-12 flex-col">
            <div className="flex w-full flex-wrap justify-between gap-2">
                {loadingMenus ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div className="cursor-pointer flex flex-col items-center" key={index}>
                            <SkeletonLoader type="circle" height={70} width={70} />
                            <SkeletonLoader type="text" count={1} height={20} width={80} className="mt-2" />
                        </div>
                    ))
                ) : (
                    menus.map((menu, index) => (
                        <Link to={`/payment${menu.route}`} className="cursor-pointer flex flex-col items-center" key={index}>
                            <img className="w-[70px]" src={menu.icon} alt={menu.title} />
                            <div className="text-center text-secondary flex flex-col items-center text-wrap text-sm mt-2">
                                {menu.title.split(' ').map((word, wordIndex) => (
                                    <span key={wordIndex}>{word}</span>
                                ))}
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div className='flex flex-col overflow-hidden my-14'>
                <h1 className='text-secondary text-base font-medium'>Temukan promo menarik</h1>
                <div className='mt-5 w-full'>
                    {loadingBanners ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <SkeletonLoader type="rect" height={150} width="30%" key={index} />
                        ))
                    ) : (
                        <ImageSlider images={banners.map(banner => banner.banner_image)} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default ContentHome;
