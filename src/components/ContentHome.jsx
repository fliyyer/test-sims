import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBanner, getServices } from '../api/user';

const ContentHome = () => {
    const [banners, setBanners] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const datas = async () => {
            try {
                const banner = await getBanner();
                setBanners(banner);
                const menu = await getServices();
                setMenus(menu);
            } catch (error) {
                console.error(error);
            }
        }
        datas();
    }, []);

    return (
        <main className="flex my-12 flex-col">
            <div className="flex w-full flex-wrap justify-between gap-2">
                {menus.map((menu, index) => (
                    <Link to={`/payment${menu.route}`} className="cursor-pointer flex flex-col items-center" key={index}>
                        <img className="w-[70px]" src={menu.icon} alt={menu.title} />
                        <div className="text-center text-secondary flex flex-col items-center text-wrap text-sm mt-2">
                            {menu.title.split(' ').map((word, wordIndex) => (
                                <span key={wordIndex}>{word}</span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex flex-col overflow-hidden my-14'>
                <h1 className='text-secondary text-base font-medium'>Temukan promo menarik</h1>
                <div className='flex mt-5 w-full overflow-x-visible overflow justify-between gap-5'>
                    {banners.map((banner, index) => (
                        <img className="w-[30%]" src={banner.banner_image} alt={banner.banner_name} key={index} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ContentHome;
