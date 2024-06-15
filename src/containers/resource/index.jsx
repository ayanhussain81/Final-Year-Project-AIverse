import { motion } from 'framer-motion';
import OutlinedButton from '../../components/common/buttons/OutlinedButton';
import Filter from './Filter';
import ResourceNftCard from './ResourceNftCard';
import { nftData } from './data.js';
import axiosInstance from 'services/axiosInstance';
import { useEffect, useState } from 'react';
import NFT from 'components/card/NFT';
import { useNavigate } from 'react-router-dom';

const pictureContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const pictureChildVariant = {
  hidden: {
    rotate: 30,
    scale: 0,
    opacity: 0,
  },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
};

export default function Resource() {
  const [models, setModels] = useState([]);
  const [currentPage] = useState(1);
  const [type] = useState([]);
  const [usecase] = useState([]);
  const navigate = useNavigate();

  const getModels = async () => {
    try {
      let url = `/models?currentPage=${currentPage}&category=${type}&usecase=${usecase}`;
      const response = await axiosInstance.get(url);
      setModels(response.data.models);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <section id="resource" aria-label="resource section" className="bg-neutral-200">
      <div className="container tablet:px-10 laptop:px-20 | py-16">
        <div className="space-y-10">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 0.3 }}
            className="text-800 text-neutral-900 font-bold font-['Montserrat',_sans-serif] leading-tight"
          >
            Discover more Models
          </motion.h2>

          <motion.div
            variants={pictureContainerVariant}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 mobile-lg:grid-cols-2 laptop:grid-cols-3 min-[1360px]:grid-cols-4 gap-10"
          >
            {models.map((nft) => (
              <motion.div className="w-3/4" variants={pictureChildVariant} key={nft.id}>
                <NFT id={nft._id} name={nft.name} author={nft.seller} image={nft.img} category={nft.category} />
              </motion.div>
            ))}
          </motion.div>

          <OutlinedButton
            onClick={() => navigate('/marketplace')}
            type="button"
            extraClasses="px-10 py-5 text-600 font-medium bg-neutral-300 leading-tight mx-auto"
          >
            Explore More
          </OutlinedButton>
        </div>
      </div>
    </section>
  );
}
