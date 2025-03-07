import { motion } from 'framer-motion';
import dotsBg from '../../assets/images/miscellaneous/dots.png';
import Picture from '../../components/common/Picture';
import ContainedButton from '../../components/common/buttons/ContainedButton';
import bannerImg from '../../assets/images/svgs/banner.svg';
import './hero.css';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section aria-label="hero section" className="bg-neutral-100 background-gradient">
      <div className="container tablet:px-10 laptop:px-20 | pb-32 pt-14 | relative z-[0]">
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-[minmax(auto,_620px),_minmax(auto,_570px)] justify-between h-[620px] items-center gap-y-20 mt-7">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 0.3 }}
            className="flex flex-col justify-between gap-y-8 gap-x-24 laptop:max-[1200px]:flex-row | max-laptop:max-w-xl max-laptop:mx-auto"
          >
            <div>
              <h1 className="text-800 text-neutral-900 font-bold font-['Montserrat',_sans-serif] leading-tight | max-w-xl mb-6">
                Explore, Engage, and Elevate with AI Innovations
              </h1>

              <p className="text-600 text-neutral-600 leading-relaxed | max-w-[470px] mb-10">
                Discover a world of AI innovation in our marketplace. Buy, sell, and explore exclusive AI models and
                services, unlocking the potential of artificial intelligence.
              </p>

              <ContainedButton
                type="button"
                extraClasses="min-[1224px]:max-[1200px]:hidden |  px-7 py-3 text-500 font leading-tight"
                onClick={() => navigate('/auth/sign-in')}
              >
                Get Started
              </ContainedButton>
            </div>
          </motion.div>

          <img src={bannerImg} alt="banner-img" className="max-[1200px]:hidden " />
        </div>

        <div className="absolute bottom-40 left-6 -z-10">
          <Picture src={dotsBg} alt="background Image positioned with hero section" extraClasses="" />
        </div>
      </div>
    </section>
  );
}
