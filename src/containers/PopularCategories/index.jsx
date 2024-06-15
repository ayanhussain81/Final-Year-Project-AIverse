import React from 'react';
import { motion } from 'framer-motion';
import { FaLanguage, FaCamera, FaChartLine, FaRobot } from 'react-icons/fa';

const categories = [
  {
    title: 'Natural Language Processing',
    description: 'Advanced models for text analysis, sentiment detection, and more.',
    icon: <FaLanguage className=" text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Computer Vision',
    description: 'State-of-the-art models for image recognition, object detection, and beyond.',
    icon: <FaCamera className="text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Predictive Analytics',
    description: 'Models designed to provide accurate predictions and insights.',
    icon: <FaChartLine className=" text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Robotics',
    description: 'Innovative AI models for robotic process automation and control.',
    icon: <FaRobot className="text-700 mb-4 mx-auto" />,
  },
];

const PopularCategories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1,
        delay: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
  };

  return (
    <section className="bg-neutral-100 py-16 tablet:px-10 laptop:px-20 font-['Montserrat',_sans-serif]">
      <motion.div className="container" initial="hidden" whileInView="visible" variants={containerVariants}>
        <motion.h2 className=" text-800 font-bold mb-12" variants={itemVariants}>
          Explore Popular Categories
        </motion.h2>
        <div className="flex flex-wrap -mx-4">
          {categories.map((category, index) => (
            <motion.div key={index} className="w-full mobile-lg:w-1/2 laptop:w-1/4 px-4 mb-8" variants={itemVariants}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                {category.icon}
                <h3 className=" text-600 mb-2 font-bold">{category.title}</h3>
                <p className="text-neutral-600 text-400">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PopularCategories;
